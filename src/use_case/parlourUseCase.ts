import Parlour from "../domain_entites/parlour";
import ParlourRepository from "./interface/parlourInterface";
import otpGen from "../infrastucture/utils/otpGen";
import sendOtp from "../infrastucture/utils/sendMail";
import Encrypt from "../infrastucture/utils/hashPassword";
import JWTtokens from "../infrastucture/utils/JWTtokens";
import User from "../domain_entites/user";
import Cloudinary from "../infrastucture/utils/cloudinary";

class ParlourUseCase{
    private parlourRepository : ParlourRepository
    private otpGen : otpGen
    private sendOtp : sendOtp
    private Encrypt : Encrypt
    private JWTtokens : JWTtokens
    private Cloudinary : Cloudinary


    constructor(parlourRepository : ParlourRepository,otpGen : otpGen,sendOtp : sendOtp, Encrypt : Encrypt,JWTtokens:JWTtokens,Cloudinary:Cloudinary){
        this.parlourRepository = parlourRepository
        this.sendOtp = sendOtp
        this.otpGen = otpGen
        this.Encrypt = Encrypt
        this.JWTtokens = JWTtokens;
        this.Cloudinary = Cloudinary;
    }




    async findVendor(name:string,email:string,password:string){
        console.log('inside parlor usecase');
        const vendorFound = await this.parlourRepository.findByEmail(email)
        if(vendorFound){
            console.log('vendorfound');
            return{
                status:200,
                data:{
                    data:true
                }
            }
        }else{
            const otp = await this.otpGen.genOtp(4)
            console.log('otp',otp)
            const mailDetails = await this.sendOtp.sendMail(name,email,otp)
            console.log('vendor maildetails');

            return{
                status:200,
                data:{
                    data:false,
                    otp:otp
                }
            }
            
        }

    }


async saveVendor(vendor:Parlour){
    try {
        const hashedPassword = await this.Encrypt.createHash(vendor.password)
        vendor.password = hashedPassword
        const vendorSave = await this.parlourRepository.saveParlour(vendor)
        
        return {
            status:200,
            data:vendorSave
        }
    } catch (error) {
        console.log(error);
        
    }
}


//gsignup
async gparlourSignup (name:string,email:string,password:string){
try {
    const parlourFound = await this.parlourRepository.findByEmail(email)
    if(parlourFound){
        return {
            status:200,
            data:false
        }
    }else{
        const hashedpassword = await this.Encrypt.createHash(password)
        const parlourSave = await this.parlourRepository.saveParlour({name,email,password:hashedpassword} as Parlour)
        return{
            status:200,
            data:parlourSave
        }
    }
} catch (error) {
    console.log(error);
    
}
}


//login
async parlourLogin(vendor:any){
    try {
        console.log('parlour usecase');
        const vendorFound : any = await this.parlourRepository.findByEmail(vendor.email)
        console.log(vendorFound);
        if(vendorFound){
            if(vendorFound.isBlocked){
                return{
                    status:200,
                    data:{
                        success:false,
                        message:"you are blocked"
                    }
                }
            }
            const passwordMatch  = await this.Encrypt.compare(vendor.password,vendorFound.password)
            if(passwordMatch){
                const token = this.JWTtokens.createJwt(vendorFound._id,'vendor');
                return{
                    status:200,
                    data:{
                        success:true,
                        messsage:'authentication success',
                        vendorId : vendorFound._id,
                        token:token

                    }
                }
            }else{
                return{
                    status:200,
                    data:{
                        success:false,
                        message:'invalid credentials'
                    }
                }
            }
        }else{
            return {
                status:200,
                data:{
                    success:false,
                    message:'invalid credentials'
                }
            }
        }
        
    } catch (error) {
        console.log(error);
        
    }
}

//forgot password
async findVendorByEmail(email:string){
    console.log('inside parlourcase');
    const parlourFound = await this.parlourRepository.findByEmail(email)
    console.log('parlouefoound',parlourFound);
    if(parlourFound){
        const otp =  await this.otpGen.genOtp(4);
        console.log(otp,'otp');
        const mailDetails = await this.sendOtp.forgotSendMail(email,otp);
        console.log('vendor found');
        return {
            status:200,
            data:{
                data:false,
                otp:otp
            }
        }
    }else{
        return {
            status:200,
            data:{
                data:true
            }

        }
    }
    
    
}

//change password
async vendorPasswordChange (email:string,password:string){
    const parlourFound = await this.parlourRepository.findByEmail(email)
    if(parlourFound){
        console.log('eefkhkhadm');
        
        const hashedPassword = await this.Encrypt.createHash(password)
        console.log(hashedPassword);
        
        const savePasswordStatus = await this.parlourRepository.changePassword(email,hashedPassword)
        return savePasswordStatus
    }
}

//adding parlour
async addParlourDetails (parlourData:any,vendorId:string){

    const parlourDetails = await this.parlourRepository.findParlourById(vendorId)

    const uploadBanners = await Promise.all(
        parlourData.banners.map(async (file:any)=>{
            return await this.Cloudinary.saveToCloudinary(file)
        })
    );

    parlourData.banners = uploadBanners;
    parlourData._id = vendorId
    console.log('helloo',parlourData);
    
    

    const parlourStatus = await this.parlourRepository.addParlour(parlourData,vendorId)
    return parlourStatus
}


async findParlourById (vendorId:string){
    try {
        const parlourFound  = await this.parlourRepository.findParlourById(vendorId)
        return{
            status:200,
            data:parlourFound
        }
    } catch (error) {
        console.log(error);
        
    }
}
}

export default ParlourUseCase