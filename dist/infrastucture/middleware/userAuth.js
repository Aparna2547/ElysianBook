"use strict";
// import jwt,{Jwt, JwtPayload} from 'jsonwebtoken'
// import { Request,Response,NextFunction } from 'express'
// import userRepository from '../repository/userRepository'
// import JWTtokens from '../utils/JWTtokens';
// import {JWTInterface} from "../../use_case/interface/jwt"
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository_1 = __importDefault(require("../repository/userRepository"));
const JWTtokens_1 = __importDefault(require("../utils/JWTtokens"));
const userRepo = new userRepository_1.default();
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let accessToken;
    accessToken = req.cookies.userJWT;
    console.log('accE', accessToken);
    if (accessToken) {
        try {
            const decoded = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_KEY);
            console.log('decoded', decoded);
            if (decoded && (!decoded.role || decoded.role !== "user")) {
                console.log('loging 1');
                return res
                    .status(401)
                    .json({ message: "Not authorized, invalid token" });
            }
            const user = yield userRepo.findUserById(decoded.id);
            if (user) {
                if (user.isBlocked) {
                    return res.status(401).json({ message: "You are blocked by admin" });
                }
                else {
                    next();
                }
            }
            else {
                console.log('logging2');
                return res
                    .status(401)
                    .json({ message: "Not authorized, invalid token" });
            }
        }
        catch (error) {
            const refreshToken = req.cookies.refreshToken;
            try {
                const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                console.log('refresh decode', decoded);
                const user = yield userRepo.findUserById(decoded.id);
                const jwtInstance = new JWTtokens_1.default();
                const newAccessToken = jwtInstance.generateAccessToken(decoded.id, "user");
                res.cookie("userJWT", newAccessToken, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: process.env.NODE_ENV !== "development",
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                });
                // req.user = decoded.user;
            }
            catch (error) {
                console.log('logging23');
                return res.status(401).json({ message: "Not authorized, invalid token" });
            }
        }
    }
    else {
        console.log('logging4');
        return res.status(401).json({ message: "Not authorized, invalid token" });
    }
});
exports.protect = protect;
