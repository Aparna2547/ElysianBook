import {Server,Socket} from 'socket.io'
import conversationRepository from '../repository/conversationRepository'


interface User{
    userId :string,
    socketId:string,
    lastSeen?:Date,
    online?:boolean
}

const conversationrepository =  new conversationRepository

function initializeSocket(server:any){
    const io = new Server(server,{
        cors:{
            origin:process.env.CORS_URL,
             methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],

        }
    });

    let users:User[] = [];

    const addUser = (userId:string,socketId:string) =>{
        console.log('adduser',userId)
        const existingUser = users.find(user=>user.userId === userId);
        if(existingUser){
            existingUser.socketId = socketId;
            existingUser.online =true
        }else{
            users.push({userId,socketId,online:true});
        }
        io.emit("userOnline",users.filter(user =>user.online))

    }


    const removeUser = async (socketId:string) =>{
        const user = users.find(user =>user.socketId === socketId)
        if(user) {
            user.lastSeen = new Date()
            user.online = false

            try{
                await conversationrepository.updateUserLastSeen(user.userId,user.lastSeen)
                io.emit('userStatusChanged',{userId:user.userId,lastSeen:user.lastSeen,online:false})
            }catch(error){
                console.log('failed to update last seen');
                
            }
        }
        io.emit("userOnline",users.filter(user=>user.online))
    };

    const getUser = (userId:string) => users.find(user=>user.userId === userId)

    io.on("connection",(socket:Socket) =>{
        console.log('user connected');
        
        socket.on("addUser",(userId) =>{
            addUser(userId,socket.id)
            io.emit("getUsers",users)
        })

        socket.on("sendMessage",({senderId,receiverId,text}) =>{
            console.log('senddddddddd',senderId,receiverId,text)
            const user = getUser(receiverId)
            console.log(user);
            
            if(user){
                io.to(user.socketId).emit("getMessage",{senderId,text})
            }
        });

        socket.on('image',(imageData:object) =>{
            console.log("recieved image data",imageData);
            socket.broadcast.emit("image",imageData)
            
        })

        socket.on("disconnect",() =>{
            console.log("user disconnected")
            removeUser(socket.id).catch(err =>console.log('error during removal of user'));
            io.emit("userOnline",users.filter(user =>user.online))
            
        })
    })
}
export default initializeSocket