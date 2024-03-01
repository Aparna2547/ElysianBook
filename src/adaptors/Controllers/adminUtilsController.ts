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
}

export default AdminUtilsController;
