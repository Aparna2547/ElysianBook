import User from "../domain_entites/user";
import UserRepository from "./interface/userInterface";;
import otpGen from "../infrastucture/utils/otpGen";
import sendOtp from "../infrastucture/utils/sendMail";
import Encrypt from "../infrastucture/utils/hashPassword";
import JWTtokens from "../infrastucture/utils/JWTtokens"


class Userusecase{
    private userRepository : UserRepository
    private otpGen :otpGen;
    private sendOtp:sendOtp;
    private Encrypt:Encrypt;
    private JWTtokens:JWTtokens;




    constructor(userRepository:UserRepository, sendOtp:sendOtp,
        otpGen:otpGen,Encrypt:Encrypt,JWTtokens:JWTtokens){
        this.userRepository = userRepository
        this.sendOtp = sendOtp
        this.otpGen=otpGen
        this.Encrypt = Encrypt
        this.JWTtokens = JWTtokens;
    }




    async findUser(name:string,email:string,password:string){
        console.log('inside usecase');
        const userFound = await this.userRepository.findByEmail(email)
        if(userFound){
            console.log('userfound'); 
            return{
                status:200,
                data:{
                    data:true
                }
            }
        }else{
            const otp = await this.otpGen.genOtp(4)
            console.log(otp,'otp');
              const mailDetails =  await this.sendOtp.sendMail(name,email,otp)
              console.log('maildetails');
              
            return{
                status:200,
                data:{
                    data:false,
                    otp:otp
                }
            }
            
        }
    }

//saving user to the db
    async saveUser(user:User){
        try {
            const hashedPassword = await this.Encrypt.createHash(user.password)
            user.password = hashedPassword
            const userSave = await this.userRepository.saveUser(user)
            return{
                status:200,
                data:userSave
            }
        } catch (error) {
            console.log(error);
            
        }
    }



//in the case of forgot password
    async findUserByMail(email: string) {
        // console.log(email);
        
        console.log('inside forgot usecase');
        const userFound = await this.userRepository.findByEmail(email);
        // console.log(userFound,'userfound')
        if (userFound) {
             const otp = await this.otpGen.genOtp(4);
            console.log(otp, 'otp');
            const mailDetails = await this.sendOtp.forgotSendMail(email, otp);
            // console.log('mail details:', mailDetails);
    
            console.log('user found');
            return {
                status: 200,
                data: {
                    data: false,
                    otp: otp
                }
            };
        } else {
           
            return {
                status: 200,
                data: {
                    data: true,
                }
            };
        }
    }
    

    //change password

    async passwordChange(email:string,password:string){
        const userFound = await this.userRepository.findByEmail(email)
        if(userFound){
            const hashedPassword  = await this.Encrypt.createHash(password)
            const savePasswordStatus = await this.userRepository.changePassword(email,hashedPassword) 
            return savePasswordStatus
        }
    }

    //login user
    
    async logIn(user: any) {
        try {
            console.log('user usecase');
            
            const userFound: any = await this.userRepository.findByEmail(user.email);
            console.log(userFound);
            
            if (userFound) {
                if (userFound.isBlocked) {
                    return {
                        status: 200,
                        data: {
                            success: false,
                            message: "You are blocked"
                        }
                    };
                }
                const passwordMatch = await this.Encrypt.compare(user.password, userFound.password);
                console.log('passwordMatch');
                
                if (passwordMatch) {
                    const token = this.JWTtokens.createJwt(userFound._id, 'user');
                    return {
                        status: 200,
                        data: {
                            success: true,
                            message: 'authentication success',
                            userId: userFound._id,
                            token: token
                        }
                    };
                } else {
                    return {
                        status: 200,
                        data: {
                            success: false,
                            message: 'invalid credentials'
                        }
                    };
                }
            } else {
                return {
                    status: 200,
                    data: {
                        success: false,
                        message: 'invalid credentials'
                    }
                };
            }
        } catch (error) {
            console.log(error);
        }
    }

    //google user signup

    async gSignupUser (name:string,email:string,password:string){
        try {
            const userFound = await this.userRepository.findByEmail(email)
    if(userFound){
        return {
            status:200,
            data:false
        }
    }    else{
        
        const hashedPassword = await this.Encrypt.createHash(password)
        const userSave = await this.userRepository.saveUser({name,email,password:hashedPassword} as User)
        return {
            status:200,
            data:userSave
        }
    }        
        } catch (error) {
            console.log(error);
            
        }
    }


    async parloursToShow(page:number){
        try {
            const parlours = await this.userRepository.getParloursToShow(page)
            return{
                status:200,
                data:parlours
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    

}



export default Userusecase
