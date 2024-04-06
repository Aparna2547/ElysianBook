import express from "express";
import userRoute from "../route/userRoute";
import parlourRoute from "../route/parlourRoute";
import adminRoute from "../route/adminRoute";
import chatRoute from '../route/chatRoute'
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import initializeSocket from "./socketServer";

export const createServer = () => {
  try {
    const app = express();
  
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(cors({origin:'http://localhost:5000',credentials:true}))

    var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


    
    app.use("/api/parlour", parlourRoute);
    app.use("/api/user", userRoute);
    app.use("/api/chat", chatRoute);
    app.use("/api/admin", adminRoute);


    const server = http.createServer(app);
    initializeSocket(server)
    return server

    //cors
    // app.use(
    //   cors({
    //     origin: "http://localhost:5000",
    //     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    //     credentials: true,
    //   })
    // );

    //chat using socket io
   
    return app;
  } catch (error) {
    console.log(error);
  }
};
