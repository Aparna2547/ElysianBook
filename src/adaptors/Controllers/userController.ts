    import {Request,Response} from "express"
    import Userusecase from "../../use_case/userUseCase";
import JWTtokens from "../../infrastucture/utils/JWTtokens";
import jwt from 'jsonwebtoken';

import { JwtPayload } from "jsonwebtoken";


    class userController{
        private usercase:Userusecase
        constructor(usercase:Userusecase){
            this.usercase=usercase
        }

       




        // async verifyEmail(req: Request, res: Response) {
        //     try {
        //         const { email, password, name } = req.body;

        //         const userData:any = await this.usercase.findUser(name, email, password);
        //         console.log(userData);
                

                
        //         if (!userData.data.data) {                    
        //             // req.app.locals.user = {email,name,password};
        //             // req.app.locals.otp = userData?.data?.otp;
        //             // console.log(req.app.locals);
        //             const otp = userData.data.otp;
        //             const jwtKey = process.env.JWT_KEY
        //             const user = req.body
        //             const payload = {user, otp};
        //             let token;
        //             if (jwtKey) {
        //                  token = jwt.sign(payload, jwtKey);
        //             } else {
        //                 // Handle the case where jwtKey is undefined
        //                 console.error("JWT key is undefined");
        //             }
        //             console.log('jwt',jwt,email,name,otp)
        //             // res.status(200).json(userData?.data);
        //             res.status(200).json({token});
        //         } else {
        //             res.status(409).json({ data: true });
        //         }
        //     } catch (error) {
        //         console.log(error);
        //         res.status(500).json({ message: "Internal Server Error" });
        //     }
        // }



        // async verifyOtp(req: Request, res: Response) {
        //     console.log('heloo')
        // try {
        //     const token = req.headers.authorization?.split(' ')[1];
        //     console.log(token);
        

                
        // if (!token) {
        //     return res.status(401).json({ message: "Unauthorized" });
        // }

        // const jwtKey = process.env.JWT_KEY;

        // if (!jwtKey) {
        //     return res.status(500).json({ message: "JWT key is not defined" });
        // }

        // // Verify the JWT token
        // const decoded = jwt.verify(token, jwtKey);
        //     const { email, otp } = decoded as { email: string; otp: string };
        //     console.log(email,otp)
        //         // const otpBody: string = req.body.otp;
        //         // const otpSaved: string = req.app.locals.otp;
        //         // console.log('jkjk',otpBody,otpSaved)

                 
        //           // Verify the JWT token
        //             //  let jwtKey = process.env.JWT_KEY
        //             // const decoded = jwt.verify(token, jwtKey);

        //             // Extract email and OTP from decoded token
        //         //     const { email, otp } = decoded as { email: string; otp: string };

                
        //         // if (req.body.otp === otp) {
        //             // const user = req.app.locals.user;

        //             // const save = await this.usercase.saveUser(user);
        //             // if (save) {
        //             //     console.log('save',save);
        //             //     return res.status(save.status).json(save);
        //             // } else {
        //             //     return res.status(400).json({ message: "Invalid otp" });
        //             // }
        //         // }
        //     } catch (error) {
        //         console.log(error);
        //         res.status(500).json({ message: "Internal Server Error" });
        //     }
        // }


        //verify email
        async verifyEmail(req: Request, res: Response) {
            try {
                const { email, password, name } = req.body;
                const userData:any = await this.usercase.findUser(name, email, password);
                console.log(userData);
                
                if (!userData.data.data) {                    
                    req.app.locals.user = {email,name,password};
                    req.app.locals.otp = userData?.data?.otp;
                    console.log('dfhfs',req.app.locals.user);
                    res.status(200).json(userData?.data);
                } else {
                    res.status(409).json({ data: true });
                }
            } catch (error) {
                console.log(error);
                res.status(501).json({ message: "Internal Server Error" });
            }
        }

        //verify otp

        async verifyOtp(req: Request, res: Response) {
            try {
                const otpBody: string = req.body.otp;
                const otpSaved: string = req.app.locals.otp;
                console.log('jkjk',otpBody,otpSaved)
                if (otpBody === otpSaved) {
                    const user = req.app.locals.user;
                    const save = await this.usercase.saveUser(user);
                    if (save) {
                        console.log('save',save);
                        return res.status(save.status).json(save);
                    } 
                }
                else {
                    return res.status(200).json({ message: "Invalid otp" });
                }
            } catch (error) {
                console.log(error);
                res.status(501).json({ message: "Internal Server Error" });
            }
        }



        //    //resend otp
            async resendOtp(req:Request,res:Response){
                try {
                    console.log('resend otp')
                    const { email, name, password } = req.app.locals.user;
                    const userData:any = await this.usercase.findUser(name, email, password);
                    console.log(userData);
                        let otpSaved = userData?.data?.otp;
                        req.app.locals.otp = otpSaved
                        console.log(req.app.locals)
                       res.status(200).json(true)
            } catch (error) {
                console.log(error);
                
            }
        }


        async gsignup(req:Request,res:Response){
            try {
                console.log('controller gsignup');
                const {email,name,password} =  req.body
                const user =await this.usercase.gSignupUser(name,email,password)
                console.log(user)
                res.status(200).json(user)
            } catch (error) {
                console.log(error);
                res.status(501).json({ message: "Internal Server Error" });
                
            }
        }

        
        async logIn(req: Request, res: Response) {
            try {
                console.log('userController');
                // const user = req.body
                const user = await this.usercase.logIn(req.body);
                console.log('kjhk',user);
                
                // Check if user is defined before accessing its properties
                if (user && user.data && typeof user.data === 'object' && 'accessToken' in user.data && 'refreshToken' in user.data) {
                    console.log('usi',user)
                    res.cookie('userJWT', user.data.accessToken, {
                        httpOnly: true,
                        secure: process.env.Node_ENV !== 'development',
                        sameSite: 'none',
                        maxAge: 30 * 24 * 60 * 60 * 1000,
                    })

                    res.cookie('RefreshToken',user.data.refreshToken,{
                        httpOnly:true,
                        secure: process.env.Node_ENV !== 'development',
                        sameSite: 'none',
                        maxAge: 30 * 24 * 60 * 60 * 1000,
                    })
            
                }
                res.status(user!.status).json(user!.data); // Use non-null assertion operator
        
            } catch (error) {
                console.log(error);
                res.status(501).json({ message: "Internal Server Error" });
            }
        }
        

     

    //forgot password
    async forgotPasswordEmail(req:Request,res:Response){
        try {
            console.log('inside forgot controller');
            const email = req.body.email;
            // console.log(email,'email in controller')
            const userData:any = await this.usercase.findUserByMail( email);

            console.log('userdata',userData.data);
            if(!userData.data.data){
             req.app.locals.email = email
             req.app.locals.otp = userData?.data?.otp;
             console.log('njn',req.app.locals.otp);
             
             res.status(201).json({data:true})
            }else{
                res.status(200).json({data:false})
            }
            
            
        } catch (error) {
            console.log(error);
            res.status(501).json({ message: "Internal Server Error" });

            
        }
    }


    // verifyotp for forgotpassword
    async verifyOtpForgotPassword(req:Request,res:Response){
        try {
            
            const otpBody = req.body.otp
            const otpLocals = req.app.locals.otp 
            if(otpBody===otpLocals){
                res.status(200).json(true)
            }else{
                res.status(200).json(false)
            }
        } catch (error) {
            console.log(error);
            res.status(501).json({ message: "Internal Server Error" });

            
        }
    }

async passwordChange(req:Request,res:Response){
    try {
        
        const email = req.app.locals.email
        const password = req.body.password
        

        const Data  = await this.usercase.passwordChange(email,password)
        res.status(200).json(Data)

    } catch (error) {
        console.log(error);
        res.status(501).json({ message: "Internal Server Error" });

        
    }
}
            

//show all parlour
async parloursToShow(req:Request,res:Response){
    try {
        // console.log('get all parlours')
        const page = parseInt(req.query.page as string) 
        const location  = req.query.location !== 'null' ?req.query.location  as string : '' 
        console.log('dfdf',location);
        

        
        const parlours = await this.usercase.parloursToShow(page,location)
        res.status(200).json(parlours)
    } catch (error) {
        console.log(error);
        res.status(501).json({ message: "Internal Server Error" });

        
    }
}

async singleParlourDetails(req:Request,res:Response){
    try {
    
        const id= req.params.id;
        // console.log('afa',id)
        const singleParlourStatus = await this.usercase.singleParlourDetails(id)
        res.status(200).json(singleParlourStatus)
    } catch (error) {
        console.log(error);
        res.status(501).json({ message: "Internal Server Error" });

        
    }
}

async getAllCategories(req:Request,res:Response){
    try {
        const data = await this.usercase.getAllCategories()
        res.status(200).json(data)
        
    } catch (error) {
        console.log(error)
    }
}




async userProfile(req:Request,res:Response){
    try {
        let userId;
        const token = req.cookies.userJWT
        if(token){
            const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
            userId = decoded.id
        }
        console.log(userId);
        const profileStatus = await this.usercase.userProfile(userId)
        res.status(200).json(profileStatus)
        
    } catch (error) {
        console.log(error);
        res.status(501).json({ message: "Internal Server Error" });

        
    }
}

async changeUserName(req:Request,res:Response){
try {
    console.log('cont')
    let userId;
    const token = req.cookies.userJWT
    if(token){
        const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
        userId = decoded.id
    }
    const name = req.body.name as string
    console.log(name)
    const changeName = await this.usercase.changeUserName(userId,name)
    res.status(200).json(changeName)

} catch (error) {
    console.log(error);
    res.status(501).json({ message: "Internal Server Error" });

    
}
}

async changeUserPassword(req:Request,res:Response){
    try {
        let userId;
        const token = req.cookies.userJWT
        if(token){
            const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
            userId = decoded.id
        }
        const {currentPassword,newPassword} = req.body
        console.log(currentPassword,newPassword);
        
        const changePassword = await this.usercase.changeUserPassword(userId,currentPassword,newPassword)
        res.cookie('userJWT', '', {
            httpOnly: true,
            expires: new Date(0)
        })
        res.status(200).json(changePassword)
    
    } catch (error) {
        console.log(error);
        res.status(501).json({ message: "Internal Server Error" });

        
    }
    }
    

    async changeUserEmail(req:Request,res:Response){
        try {
            
            
            const email = req.body.email
            const userData = await this.usercase.changeUserEmail(email)
            if(userData && userData.data && !userData.data.data){
                req.app.locals.user = email
                req.app.locals.otp = userData?.data?.otp; 
                res.status(200).json(userData?.data)
            }else{
                res.status(200).json({data:true})
            }
    
            
        } catch (error) {
            console.log(error);
            res.status(501).json({ message: "Internal Server Error" });

            
        }
    
    }


    async changeUserEmailSave(req:Request,res:Response){
        try {
            const otpBody = req.body.otp;
            console.log("gdddf",otpBody)
            let userId;
            const token = req.cookies.userJWT
            if(token){
                const decoded = jwt.verify(token,process.env.JWT_KEY as string) as JwtPayload;
                userId = decoded.id;
            }
            const otpSaved:string = req.app.locals.otp
                console.log("optsa",otpBody,otpSaved);
                if(otpBody===otpSaved){
                  
                    const email = req.app.locals.user
                    console.log("this",email,userId)
                    const editEmail = await this.usercase.changeUserEmailSave(userId,email);
                    return res.status(200).json(editEmail)
                }
        } catch (error) {
            console.log(error);
            res.status(501).json({ message: "Internal Server Error" });

            
        }
    }

    async  deleteProfilePicture(req:Request,res:Response){
        try {
            let userId;
            const token = req.cookies.vendorJWT
            if(token){
                const decoded = jwt.verify(token,process.env.JWT_KEY as string) as JwtPayload;
                userId = decoded.id;
            }
            const imageStatus = await this.usercase.deleteProfilePicture(userId)
            res.status(200).json(imageStatus)
        } catch (error) {
            res.status(501).json({ message: "Internal Server Error" });
            
        }
    }

    async changeProfilePicture(req:Request,res:Response){
        try {
            console.log('in controller')
            let userId;
            const token = req.cookies.vendorJWT
            if(token){
                const decoded = jwt.verify(token,process.env.JWT_KEY as string) as JwtPayload;
                userId = decoded.id;
            }
            const image = req.files as object
            const changeImage = await this.usercase.changeProfilePicture(userId,image)
            res.status(200).json(changeImage)

        } catch (error) {
            console.log(error);
            res.status(501).json({ message: "Internal Server Error" });

            
        }
    }
    


    // //to get all services from a parlour
    // async getAllServices (req:Request,res:Response){
    //     console.log('inside parlour service')
    //     const id = req.params.id
    //     console.log('id',id)
    // }






            //user logout
            async logout(req:Request,res:Response){
                try {
                    res.cookie('userJWT', '', {
                        httpOnly: true,
                        expires: new Date(0)
                    })
                    res.status(200).json({success:true})
                    
                } catch (error) {
                    console.log(error);
                    
                }
            }
            
    }


    export default userController