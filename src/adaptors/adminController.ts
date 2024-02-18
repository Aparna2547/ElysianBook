import { Request,Response, request } from "express";
import AdminUseCase from "../use_case/adminUseCase"
import { isBlock } from "typescript";


class adminController{
    private admincase: AdminUseCase
    constructor(admincase:AdminUseCase){
        this.admincase = admincase
    }



    //email verifying
    async verifyEmail(req:Request,res:Response){
        try {
        console.log('admin controller');
            const admin = await this.admincase.adminLogin(req.body)
            if(admin && admin.data && typeof admin.data === 'object' && 'token' in admin.data){
                res.cookie('adminJWT',admin.data.token,{
                    httpOnly: true,
                    secure: process.env.Node_ENV !== 'development',
                    sameSite: 'strict',
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                });
            }
          
            res.status(admin!.status).json(admin!.data)

        } catch (error) {
            console.log(error);
            
        }
    }

    //getting all users
    async getUsers(req:Request,res:Response){
        try {
            console.log('all users');
            const allUsers = await this.admincase.getUser()
            res.status(200).json(allUsers?.data)            
        } catch (error) {
            console.log(error);
            
        }
    }


    //user blocking and unblocking
    async blockUser(req:Request,res:Response){
        try {
            console.log('inside controller');
        const id = req.body.id as string
        const userStatus = await this.admincase.blockUser(id)
        res.status(200).json(userStatus)
        } catch (error) {
            console.log(error);
            
        }
            
    }


    //list all vendors
    async getVendors(req:Request,res:Response){
        try {
            console.log('all vendrs');
            const allVendors = await this.admincase.getVendor()
            console.log(allVendors);
            res.status(200).json(allVendors?.data)
            
        } catch (error) {
            console.log(error);
            
        }
    }


    //block vendor
    async blockVendor(req:Request,res:Response){
        try {
            console.log('all block vendors');
            const id = req.body.id as string
            const vendorStatus = await this.admincase.blockVendor(id)
            res.status(200).json(vendorStatus)
            
        } catch (error) {
            console.log(error);
            
        }
    }

    //admin logout
    async adminLogout(req:Request,res:Response){
        try {
            res.cookie('adminJWT', '', {
                httpOnly: true,
                expires: new Date(0)
            })
            res.status(200).json({success:true})
            
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default adminController