// import jwt,{Jwt, JwtPayload} from 'jsonwebtoken'
// import { Request,Response,NextFunction } from 'express'
// import userRepository from '../repository/userRepository'
// import JWTtokens from '../utils/JWTtokens';
// import {JWTInterface} from "../../use_case/interface/jwt"

// const userRepo = new userRepository();

// declare global{
//     namespace express{
//         interface Request{
//             userId?:string
//         }
//     }
// }


// const protect = async (req:Request,res:Response,next:NextFunction)=>{
//     let accessToken;
//     accessToken = req.cookies.userJWT;


//     if(accessToken){
//         try {
//             const decoded= jwt.verify(accessToken,process.env.JWT_KEY as string)as JwtPayload;

//             if(decoded && (!decoded.role || decoded.role!=='user')){
//                 return res.status(401).json({message:"Not authorized, invalid token"})
//             }

//             const user = await userRepo.findUserById(decoded.id as string)
//             if(user){
//                     if(user.isBlocked){
//                         return res.status(401).json({message:"You are blocked by admin"})
//                     }else{
//                         next();
//                     }
//             }else{
//                 return res.status(401).json({message:"Not authorized, invalid token"});
//             }
//         } catch (error) {
//             const refreshToken = req.cookies.refreshToken
//             try {
//                 const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload
//             const user = await userRepo.findUserById(decoded.id as string)
//             const newAccessToken  = JWTtokens.generateAccessToken(decoded.user,'user')
//             res.cookie('userJWT', newAccessToken, {
//                 httpOnly: true,
//                 sameSite: 'none',
//                 secure: process.env.NODE_ENV !== 'development',
//                 maxAge: 30 * 24 * 60 * 60 * 1000 
//             });

//             // req.user = decoded.user;
//             } catch (error) {
                
//             }
//             return res.status(401).json({message:"Not authorized, invalid token"});
//         }
//     }else{
//         return res.status(401).json({message:"Not authorized, invalid token"});
//     }
// }

// export {protect}

import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import userRepository from "../repository/userRepository";
import { Request, Response, NextFunction } from "express";
import JWTtokens from "../utils/JWTtokens";

const userRepo = new userRepository();

declare global {
  namespace express {
    interface Request {
      userId?: string;
    }
  }
}

const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let accessToken;
  accessToken = req.cookies.userJWT;
  console.log('accE',accessToken);
  

  if (accessToken) {
    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.JWT_KEY as string
      ) as JwtPayload;
      console.log('decoded',decoded)
      if (decoded && (!decoded.role || decoded.role !== "user")) {
        console.log('loging 1')
        return res
          .status(401)
          .json({ message: "Not authorized, invalid token" });
      }

      const user = await userRepo.findUserById(decoded.id as string);
      if (user) {
        if (user.isBlocked) {
          return res.status(401).json({ message: "You are blocked by admin" });
        } else {
          next();
        }
      } else {
        console.log('logging2');
        
        return res
          .status(401)
          .json({ message: "Not authorized, invalid token" });
      }
    } catch (error) {
      const refreshToken = req.cookies.refreshToken;
      try {
        
        const decoded = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET as string
        ) as JwtPayload;
        console.log('refresh decode',decoded)
        const user = await userRepo.findUserById(decoded.id as string);
        const jwtInstance = new JWTtokens(); 
        const newAccessToken = jwtInstance.generateAccessToken(
          decoded.id as string,
          "user"
        );
        res.cookie("userJWT", newAccessToken, {
          httpOnly: true,
          sameSite: "none",
          secure: process.env.NODE_ENV !== "development",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        // req.user = decoded.user;
      } catch (error) {
        console.log('logging23');
        
      return res.status(401).json({ message: "Not authorized, invalid token" });
      }
    }
  } else {
    console.log('logging4');
    
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};


export { protect };
