import {Request,Response
} from "express"
import ParlourUseCase from "../../use_case/parlourUseCase"
import JWTtokens from "../../infrastucture/utils/JWTtokens"
import jwt,{ JwtPayload } from "jsonwebtoken"

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
            console.log(email,password);
            
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
                        sameSite: 'none',
                        maxAge: 30 * 24 * 60 * 60 * 1000,
                });
            }
            
            

            res.status(vendor!.status).json(vendor!.data)
            
        } catch (error) {
            console.log(error);
            
        }
    }

    async vendorForgotPassword(req:Request,res:Response){
        try {
            const email = req.body.email
            const vendorData:any = await this.parlourcase.findVendorByEmail(email)
            console.log(vendorData);

            if(!vendorData.data.data){
                req.app.locals.email = email
                req.app.locals.otp = vendorData?.data?.otp;
                console.log(req.app.locals.otp);

                res.status(201).json({data:true})
                
            }else{
                res.status(200).json({data:false})
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }

    async vendorVerifyOtpForgotPassword(req:Request,res:Response){
        try {
            const otpBody = req.body.otp;
            const otpLocals = req.app.locals.otp
            if(otpBody==otpLocals){
                res.status(200).json(true)
            }else{
                res.status(200).json(false)
            }
        } catch (error) {
            console.log(error);
            
        }
    }


    async vendorPasswordChange(req:Request,res:Response){
        try {
            const email = req.app.locals.email
            const password = req.body.password

            const Data = await this.parlourcase.vendorPasswordChange(email,password)
            res.status(200).json(Data)
        } catch (error) {
            console.log(error);
            
        }
    }



    //parlour adding (request sent to admin)
        async addParlour(req:Request,res:Response){
            try {
                // console.log('helloooo')
                const token = req.cookies.vendorJWT
                
                const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
                const vendorId = decoded.id;
                
                console.log('parlour adding in controller');
                
                const parlourDetails = req.body 
                const banners = req.files as Object
                console.log(typeof(parlourDetails))
                
                parlourDetails.banners = banners
                
                // console.log(parlourDetails,image);
                const addParlourDetails = await this.parlourcase.addParlourDetails(parlourDetails,vendorId)
                res.status(200).json(addParlourDetails)

                
        } catch (error) {
            console.log(error)
        }
    }


    //edit parlour
    async editParlour(req:Request,res:Response){
        try {
            const token = req.cookies.vendorJWT
                
                const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
                const vendorId = decoded.id;
            console.log('njn vannee',vendorId)
            const parlourDetails = req.body 
            const banners = req.files as Object
            parlourDetails.banners = banners
            console.log('type',typeof(parlourDetails));
            

            const editParlourStatus = await this.parlourcase.editParlour(vendorId,parlourDetails)
            res.status(200).json(editParlourStatus)

        } catch (error) {
            console.log(error);
            
        }
    }

    async getParlour(req:Request,res:Response){
        try {
            const token = req.cookies.vendorJWT
                
            const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
            const vendorId = decoded.id;
            
            const parlourDetails = await this.parlourcase.findParlourById(vendorId)
            res.status(200).json(parlourDetails)
        } catch (error) {
            console.log(error);
            
        }
    }


    async vendorProfile(req:Request,res:Response){
        try {
            console.log('profile vendorcontroler')
            let vendorId;
            const token = req.cookies.vendorJWT
            console.log(token)
            if(token){
                const decoded = jwt.verify(token,process.env.JWT_KEY as string) as JwtPayload;
                vendorId = decoded.id;
            }
            console.log(vendorId,'vendorid')
            const profileStatus = await this.parlourcase.vendorProfile(vendorId)
            res.status(200).json(profileStatus)
        } catch (error) {
            console.log(error);
            
        }
    }

    async editVendorName(req:Request,res:Response){
        try{
            console.log('edit venor controller');

            let vendorId;
            const token = req.cookies.vendorJWT
            if(token){
                const decoded = jwt.verify(token,process.env.JWT_KEY as string) as JwtPayload;
                vendorId = decoded.id;
            }
            console.log(vendorId,'vendorid')

            const name = req.body.name as string
            console.log(name)
            const nameStatus = await this.parlourcase.editVendorName(vendorId,name)
            res.status(200).json(nameStatus)
            
        }catch(error){
            console.log(error)
        }
    }


    async editVendorPassword(req:Request,res:Response){
        try {

            
            let vendorId;
            const token = req.cookies.vendorJWT
            if(token){
                const decoded = jwt.verify(token,process.env.JWT_KEY as string) as JwtPayload;
                vendorId = decoded.id;
            }
            console.log(vendorId,'vendorid')
            const {currentPassword,newPassword} = req.body
            
            console.log(currentPassword,newPassword);
            const changePassword = await this.parlourcase.editVendorPassword(vendorId,currentPassword,newPassword)
            res.cookie('vendorJWT', '', {
                httpOnly: true,
                expires: new Date(0)
            })
            // res.status(200).json({success:true})
            res.status(200).json(changePassword)

        
            
        } catch (error) {
            console.log(error);
            
        }
    }


async editVendorEmail(req:Request,res:Response){
    try {
        let vendorId;
        const token = req.cookies.vendorJWT
        if(token){
            const decoded = jwt.verify(token,process.env.JWT_KEY as string) as JwtPayload;
            vendorId = decoded.id;
        }
        
        const email = req.body.email
        console.log('controller,',email);
        const vendorData = await this.parlourcase.editVendorEmail(vendorId,email)
        if(vendorData && vendorData.data && !vendorData.data.data){
            req.app.locals.vendor = email
            req.app.locals.vendorId = vendorId
            req.app.locals.otp = vendorData?.data?.otp; 
            res.status(200).json(vendorData?.data)
        }else{
            res.status(200).json({data:true})
        }

        
    } catch (error) {
        console.log(error);
        
    }

}

async editVendorEmailOtp(req:Request,res:Response){
    try {
        const otpBody = req.body.otp;
        console.log(otpBody)
        const otpSaved:string = req.app.locals.otp
            console.log("optsa",otpBody,otpSaved);
            if(otpBody===otpSaved){
                // let vendorId;
                // const token = req.cookies.vendorJWT
                // if(token){
                //     const decoded = jwt.verify(token,process.env.JWT_KEY as string) as JwtPayload;
                //     vendorId = decoded.id;
                // } 
                const email = req.app.locals.vendor
                const vendorId = req.app.locals.vendorId
                console.log(email,vendorId)
                const editEmail = await this.parlourcase.editVendorEmailSave(vendorId,email);
                return res.status(200).json(editEmail)
            }
    } catch (error) {
        console.log(error);
        
    }
}





//dashboard details
async dashboardDetails(req:Request,res:Response){
    try {
        let parlourId ;
        const token = req.cookies.vendorJWT
        if(token){
            const decoded = jwt.verify(token,process.env.JWT_KEY as string) as JwtPayload
            parlourId = decoded.id
            
        }
        console.log(parlourId)
        const dashboardDetails = await this.parlourcase.dashboardDetails(parlourId)
        res.status(200).json(dashboardDetails)
    } catch (error) {
        console.log(error);
        return res.status(500).json("Fetching error")
        
    }
}

//for charts
async getMonthlyCompletedBooking(req:Request,res:Response){
    try {
        
        let parlourId ;
        const token = req.cookies.vendorJWT
        if(token){
            const decoded = jwt.verify(token,process.env.JWT_KEY as string) as JwtPayload
            parlourId = decoded.id
            
        }
        const year = parseInt(req.query.year as string)
        const result = await this.parlourcase.getMonthlyCompletedBooking(parlourId,year)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        
    }
}

// async revenueAndRefund(req:Request,res:Response){
//     try {
//         let parlourId ;
//         const token = req.cookies.vendorJWT
//         if(token){
//             const decoded = jwt.verify(token,process.env.JWT_KEY as string) as JwtPayload
//             parlourId = decoded.id
            
//         }
//         const year = parseInt(req.query.year as string)
//         const result = await this.parlourcase.revenueAndRefund(parlo)
//         res.status(200).json(result)

//     } catch (error) {
//         res.status(500).json('internal server error')
//     }
// }

async addHolidays(req:Request,res:Response){
    try {
        let parlourId ;
        const token = req.cookies.vendorJWT
        if(token){
            const decoded = jwt.verify(token,process.env.JWT_KEY as string) as JwtPayload
            parlourId = decoded.id
            
        }   

        const date = req.query.date as string;
        console.log(date);
        const convertedDate = new Date(date)
        convertedDate.setDate(convertedDate.getDate())
        convertedDate.setUTCHours(0, 0, 0, 0);
        console.log('converteddate',convertedDate.toISOString())
        
        if (!parlourId || !date) {
            return res.status(400).json({ message: 'Invalid parlourId or dates' });
        }
        const holidays = await this.parlourcase.addHolidays(parlourId,convertedDate)
        res.status(200).json(holidays)
    } catch (error) {
        res.status(500).json('internal server error')
    }
}
    async vendorLogout(req:Request,res:Response){
        try {
            res.cookie('vendorJWT', '', {
                httpOnly: true,
                expires: new Date(0)
            })
            res.status(200).json({success:true})
            
        } catch (error) {
            console.log(error);
            
        }
    }
}


export default parlourController