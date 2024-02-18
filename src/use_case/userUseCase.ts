import User from "../domain/user";
import userRepository from "../infrastucture/repository/userRepository";
import otpGen from "../infrastucture/utils/otpGen";
import sendOtp from "../infrastucture/utils/sendMail";
import Encrypt from "../infrastucture/utils/hashPassword";
import JWTtokens from "../infrastucture/utils/JWTtokens"


class Userusecase{
    private userRepository : userRepository
    private otpGen :otpGen;
    private sendOtp:sendOtp;
    private Encrypt:Encrypt;
    private JWTtokens:JWTtokens;




    constructor(userRepository:userRepository, sendOtp:sendOtp,
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
    

}



export default Userusecase
