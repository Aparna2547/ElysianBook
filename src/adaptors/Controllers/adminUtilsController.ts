import { Request, Response } from "express";
import AdminUtilsUsecase from "../../use_case/adminUtilsUseCase";

class AdminUtilsController {
    private adminUtilsCase: AdminUtilsUsecase;

    constructor(adminUtilsCase: AdminUtilsUsecase) {
        this.adminUtilsCase = adminUtilsCase;
    }

    async addFacility(req: Request, res: Response) {
        try {
            console.log('inside addfacility');
            const facility = req.body.facility  
            console.log(facility)      
            const facilityStatus = await this.adminUtilsCase.addFacility(facility)
            res.status(200).json(facilityStatus)         
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    }


    async getFacilites(req:Request,res:Response){
        try {
            // console.log('inside facilities')
            const allFacilities = await this.adminUtilsCase.allFacilities()
            res.status(200).json(allFacilities?.data)
        } catch (error) {
            console.log(error);
            
        }
    }

    async addBanner(req:Request,res:Response){
        try {
            console.log('hello',req.files);
            const image = req.files

            const addBanner= this.adminUtilsCase.addBanner(image)
            res.status(200).json(addBanner)
            
            
        } catch (error) {
            res.status(500).json('internal servererror')
        }
    }


    async getBanners(req:Request,res:Response){
        try {
            const banners = await this.adminUtilsCase.getBanners()
            res.status(200).json(banners)

        } catch (error) {
            res.status(500).json('internal server error')
        }
    }

    async deleteBanner(req:Request,res:Response){
        try {
            console.log('hi',req.query.banner)
            const banner = req.query.banner as string
            const bannerDelete = await this.adminUtilsCase.deleteBanner(banner)
            res.status(200).json(bannerDelete)
        } catch (error) {
            console.log(error);
            res.status(500).json('internal server eror')
            
        }
    }
}

export default AdminUtilsController;
