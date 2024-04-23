// import Ijwt from "../../use_case/interface/jwt";
// import jwt from "jsonwebtoken"

// class JWTtokens implements Ijwt{
//     createJwt(userId: string,role:string): string {
//         const jwtKey = process.env.JWT_KEY
//         if(jwtKey){
//             const token:string = jwt.sign(
//                 {id:userId ,role:role},
//                 jwtKey
//             );
//             return token
//         }
//         throw new Error("JWT_KEY is not defined");
//     }
    
// }

// export default JWTtokens


import Ijwt from "../../use_case/interface/jwt";
import jwt from "jsonwebtoken"

class JWTtokens implements Ijwt{

    createJwt(userId: string,role:string): string {
                const jwtKey = process.env.JWT_KEY
                if(jwtKey){
                    const token:string = jwt.sign(
                        {id:userId ,role:role},
                        jwtKey
                    );
                    return token
                }
                throw new Error("JWT_KEY is not defined");
            }
            

    generateAccessToken(userId: string,role:string): string {
      const jwtKey = process.env.JWT_KEY
      if(jwtKey){
      const accessToken : string = jwt.sign({id:userId,role:role},jwtKey,{expiresIn:'7d'})
      return accessToken
      }
      throw new Error("Access token is not defined")

    }

    generateRefreshToken(userId:string):string {
        const refreshKey = process.env.REFRESH_TOKEN_SECRET;
        if(refreshKey){
            const refreshToken : string = jwt.sign({id:userId},refreshKey,{expiresIn:'30d'})
            return refreshToken
        }
      throw new Error("Access token is not defined")

    }
    
}

export default JWTtokens