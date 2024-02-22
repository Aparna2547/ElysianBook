import { createServer } from "./infrastucture/config/app";
import { connetDb } from "./infrastucture/config/connectDb";
import dotenv from 'dotenv'
dotenv.config()


const startServer = async ()=>{
    try {
        await connetDb()

        const app = createServer()
        app?.listen(3000,()=>{
            console.log('connected to the server');
        })
    } catch (error) {
        console.log(error);
        
    }
}

startServer()
