import {Request,Response
} from "express"
import ParlourUseCase from "../use_case/parlourUseCase"


class parlourController{
    private parlourcase : ParlourUseCase
    constructor(parlourcase : ParlourUseCase){
        this.parlourcase = parlourcase
    }



    //email verifying
    async verifyEmail(req:Request,res:Response){
        console.log('controller')
        try {
            const {email,password,name} = req.body;
            const vendorData:any = await this.parlourcase.findVendor(name,email,password)
            console.log('hh',vendorData);

            if(!vendorData.data.data){
                req.app.locals.vendor = {email,name,password}
                req.app.locals.otp = vendorData?.data?.otp;
                console.log('kdfhoiafhoah',req.app.locals);
                res.status(200).json(vendorData?.data)
                
            }else{
                res.status(200).json({data:true});
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }


    //verfiying otp
    async verifyOtp(req:Request,res:Response){
        try {
            console.log('thenga');
            
            const otpBody:string = req.body.otp;
            const otpSaved:string = req.app.locals.otp
            console.log("optsa",otpBody,otpSaved);
            
            if(otpBody === otpSaved){
                const vendor = req.app.locals.vendor;
                console.log(vendor)
                const save = await this.parlourcase.saveVendor(vendor)
                if(save){
                    console.log('sadfas');
                    return res.status(save.status).json(save)
                }else{
                    return res.status(200).json({message:"invalid otp"})
                }
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    //google isgnup
    async gsignup (req:Request,res:Response){
        try {
            console.log('controller gsignup')
            const {email,name,password} = req.body
            const parlour = await this.parlourcase.gparlourSignup(name,email,password)
            console.log(parlour);
            res.status(200).json(parlour)
            
        } catch (error) {
            console.log(error);
            
        }
    }

    //vendor login
    async vendorLogin(req:Request,res:Response){
        try {
            console.log('vendor controller');
            const vendor = await this.parlourcase.parlourLogin(req.body)
            if(vendor && vendor.data && typeof vendor.data ==='object' && 'token' in vendor.data){
                res.cookie('vendorJWT',vendor.data.token,{
                    httpOnly: true,
                    secure: process.env.Node_ENV !== 'development',
                    sameSite: 'strict',
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                });
            }

            res.status(vendor!.status).json(vendor!.data)
            
        } catch (error) {
            console.log(error);
            
        }
    }
}


export default parlourController