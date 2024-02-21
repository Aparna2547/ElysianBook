import express from "express"
import userRoute from '../route/userRoute'
import parlourRoute from "../route/parlourRoute"
import adminRoute from "../route/adminRoute"
import cors from "cors"
export const createServer = () =>{
    try {
        const app = express()
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))


        //cors
        app.use(
            cors({
                origin:'http://localhost:3000',
                methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
                credentials:true
            })
        )

        app.use('/api/parlour',parlourRoute)
        app.use('/api/user',userRoute)
        app.use('/api/admin',adminRoute) 

        return app
    } catch (error) {
        console.log(error);
        
    }
}