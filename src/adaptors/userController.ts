    import {Request,Response} from "express"
    import Userusecase from "../use_case/userUseCase"


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
                console.log(otpBody,otpSaved)
                if (otpBody === otpSaved) {
                    const user = req.app.locals.user;
                    const save = await this.usercase.saveUser(user);
                    if (save) {
                        console.log('save');
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
        
    }


    export default userController