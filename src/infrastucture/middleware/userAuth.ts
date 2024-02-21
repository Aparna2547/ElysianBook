import jwt,{Jwt, JwtPayload} from 'jsonwebtoken'
import { Request,Response,NextFunction } from 'express'
import userRepository from '../repository/userRepository'


const userRepo = new userRepository();

declare global{
    namespace express{
        interface Request{
            userId?:string
        }
    }
}


const protect = async (req:Request,res:Response,next:NextFunction)=>{
    let token;
    token = req.cookies.userJWT;

    if(token){
        try {
            const decoded= jwt.verify(token,process.env.JWT_KEY as string)as JwtPayload;

            if(decoded && (!decoded.role || decoded.role!=='user')){
                return res.status(401).json({message:"Not authorized, invalid token"})
            }

            const user = await userRepo.findUserById(decoded.id as string)
            if(user){
                    if(user.isBlocked){
                        return res.status(401).json({message:"You are blocked by admin"})
                    }else{
                        next();
                    }
            }else{
                return res.status(401).json({message:"Not authorized, invalid token"});
            }
        } catch (error) {
            return res.status(401).json({message:"Not authorized, invalid token"});
        }
    }else{
        return res.status(401).json({message:"Not authorized, invalid token"});
    }
}

export {protect}