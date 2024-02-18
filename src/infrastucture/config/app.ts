import express from "express"
import userRoute from '../route/userRoute'
import parlourRoute from "../route/parlourRoute"
import adminRoute from "../route/adminRoute"


export const createServer = () =>{
    try {
        const app = express()
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))

        app.use(userRoute)
        app.use(parlourRoute)
        app.use(adminRoute)

        return app
    } catch (error) {
        console.log(error);
        
    }
}