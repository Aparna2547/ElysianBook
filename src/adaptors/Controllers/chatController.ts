import { Request,Response } from "express"
import chatUseCase from "../../use_case/chatUseCase"
import jwt, { JwtPayload } from "jsonwebtoken";

class chatController{
    private chatusecase:chatUseCase
    constructor(chatusecase:chatUseCase){
        this.chatusecase = chatusecase
    }

    async newConversation(req: Request, res: Response) {
        try {

            let senderId;

            let token = req.cookies.userJWT
            if(token){
                const decoded = jwt.verify(token,process.env.JWT_KEY as string) as JwtPayload
                senderId = decoded.id  
            }

            const receiverId = req.query.parlourId as string
            console.log('inside chat',senderId,receiverId);
            
            
            const newConversation = await this.chatusecase.newConversation(senderId,receiverId)
            res.status(200).json(newConversation)
          
        } catch (error) {
            console.log(error);
        }
    }
    


async getMessages(req: Request, res: Response) {
    try {
        console.log('ki',req.query.conversationId);
        
        const messages = await this.chatusecase.getMessages(req.query.conversationId as string)
        res.status(messages.status).json(messages.data)
    } catch (error) {
        console.log(error)
    }
}

///parllour
async getConversations(req:Request,res:Response){
    try {

        
        const id = req.query.parlourId as string
        console.log("sfsdfsdfsdf",id)
        const conversations = await this.chatusecase.getConversations(id)
        res.status(conversations.status).json(conversations.data)
        
    } catch (error) {
        console.log(error);
        
    }
}

async addMessage(req:Request,res:Response){
    try {
        console.log('hai')
        const data = req.body
        console.log(data)
        const message = await this.chatusecase.addMessage(data)
        res.status(message.status).json(message.data)
    } catch (error) {
        console.log(error);
    }
}

async findUserById(req:Request,res:Response){
    try {
        const userId = req.query.userId as string
        const findUserById = await this.chatusecase.findUserById(userId)
        res.status(200).json(findUserById)

    } catch (error) {
        console.log(error);
        
    }
}
}


export default chatController
