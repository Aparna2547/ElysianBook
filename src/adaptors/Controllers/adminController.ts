import { Request,Response } from "express";
import Adminusecase from "../../use_case/adminUseCase";
import { isBlock } from "typescript";


class adminController{
    private admincase: Adminusecase
    constructor(admincase:Adminusecase){
        this.admincase = admincase
    }



    //email verifying
    async verifyEmail(req:Request,res:Response){
        try {
        console.log('admin controller');
            const admin = await this.admincase.adminLogin(req.body)
            console.log('admin',admin)
            if(admin && admin.data && typeof admin.data === 'object' && 'token' in admin.data){
                console.log(admin);
                
                res.cookie('adminJWT',admin.data.token,{
                    httpOnly: true,
                    secure: process.env.Node_ENV !== 'development',
                    sameSite: 'none',
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                });
                console.log(req.cookies.adminJWT);
                
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
            const search = req.query.search as string || "" ;
            const page = parseInt(req.query.page as string)
            
            console.log(search,'search')

            const allUsers = await this.admincase.getUser(search,page)
            res.status(200).json(allUsers?.data)            
        } catch (error) {
            console.log(error);
            
        }
    }


    //user blocking and unblocking
    async blockUser(req:Request,res:Response){
        try {
            console.log('inside controller');
        const id = req.query.id as string
        // console.log('controller',id)
        const userStatus = await this.admincase.blockUser(id)
        res.status(200).json(userStatus)
        } catch (error) {
            console.log(error);
            
        }
            
    }


    //list all vendors
    // async getVendors(req:Request,res:Response){
    //     try {
    //         console.log('all vendrs');
    //         const search = req.query.search as string
    //         const page = parseInt(req.query.page as string)
    //         const allVendors = await this.admincase.getVendor(search,page)
    //         console.log(allVendors);
    //         res.status(200).json(allVendors?.data)
            
    //     } catch (error) {
    //         console.log(error);
            
    //     }
    // }


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

    async getParlours(req:Request,res:Response){
        try {
            console.log('getParlours')

            const search = req.query.search as string
            const page = parseInt(req.query.page as string)
            const parlourStatus = await this.admincase.getParlours(search,page)
            res.status(200).json(parlourStatus)
        } catch (error) {
            console.log(error);
            
        }
    }


    async singleParlourDetails(req:Request,res:Response){
        try {
            const id = req.query.id as string;
            console.log('controller work aavanee',id)
            const singleParlourStatus = await this.admincase.singleParlour(id);
            res.status(200).json(singleParlourStatus)
        } catch (error) {
            console.log(error);
            
        }
    }

    async parlourRequestConfirmation(req:Request,res:Response){
        try {
            console.log('inside the new page')
            const id = req.body.id as string
            const value = req.body.value as string
            console.log(value,'value')
            console.log(id,'id')
            const confirmationValue = await this.admincase.parlourRequestConfirmation(id,value)
            res.status(200).json(confirmationValue)
        } catch (error) {
            console.log(error);
            
        }
    }


    //for taking all details
    async totalDetails(req:Request,res:Response){
        try {
            const totalDetails = await this.admincase.totalDetails()
            res.status(200).json(totalDetails)
        } catch (error) {
            console.log(error);
            res.status(500).json('internal server error')
            
        }
    }

    async monthlyData(req:Request,res:Response){
        try {
        const year = parseInt(req.query.year as string)

            const totalDetails = await this.admincase.monthlyData(year)
            res.status(200).json(totalDetails)


            
        } catch (error) {
            
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