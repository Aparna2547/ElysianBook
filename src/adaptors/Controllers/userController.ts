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

       




        async verifyEmail(req: Request, res: Response) {
            try {
                const { email, password, name } = req.body;
                const userData:any = await this.usercase.findUser(name, email, password);
                console.log(userData);
                
                if (!userData.data.data) {                    
                    req.app.locals.user = {email,name,password};
                    req.app.locals.otp = userData?.data?.otp;
                    console.log(req.app.locals);
                    res.status(200).json(userData?.data);
                } else {
                    res.status(409).json({ data: true });
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "Internal Server Error" });
            }
        }



        async verifyOtp(req: Request, res: Response) {
            try {
                const otpBody: string = req.body.otp;
                const otpSaved: string = req.app.locals.otp;
                // console.log('jkjk',otpBody,otpSaved)
                if (otpBody === otpSaved) {
                    const user = req.app.locals.user;
                    const save = await this.usercase.saveUser(user);
                    if (save) {
                        console.log('save',save);
                        return res.status(save.status).json(save);
                    } else {
                        return res.status(400).json({ message: "Invalid otp" });
                    }
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "Internal Server Error" });
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
                
            }
        }

        
        async logIn(req: Request, res: Response) {
            try {
                console.log('userController');
                // const user = req.body
                // taking credentials from user
                const user = await this.usercase.logIn(req.body);
        
                // Check if user is defined before accessing its properties
                if (user && user.data && typeof user.data === 'object' && 'token' in user.data) {
                    res.cookie('userJWT', user.data.token, {
                        httpOnly: true,
                        secure: process.env.Node_ENV !== 'development',
                        sameSite: 'strict',
                        maxAge: 30 * 24 * 60 * 60 * 1000,
                    });
                }
        
                res.status(user!.status).json(user!.data); // Use non-null assertion operator
        
            } catch (error) {
                console.log(error);
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
        
    }
}
            

//show all parlour
async parloursToShow(req:Request,res:Response){
    try {
        console.log('get all parlours')
        const page = parseInt(req.query.page as string) 

        
        const parlours = await this.usercase.parloursToShow(page)
        res.status(200).json(parlours)
    } catch (error) {
        console.log(error);
        
    }
}

async singleParlourDetails(req:Request,res:Response){
    try {
    
        const id= req.params.id;
        console.log('afa',id)
        const singleParlourStatus = await this.usercase.singleParlourDetails(id)
        res.status(200).json(singleParlourStatus)
    } catch (error) {
        console.log(error);
        
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
            
        }
    }
    

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