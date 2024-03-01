import {AdminUtilsModel} from "../database/AdminUtilsModel"
import IAdminutilsRepository from "../../use_case/interface/adminutilsInterface";

class AdminutilsRepository implements IAdminutilsRepository {
   

    async addFacility(facility:string){
        const newFacility = await AdminUtilsModel.updateOne({},
            {$addToSet:{facilities:facility}},
            {upsert:true}
            )
            console.log(newFacility)
            return newFacility
    }

    async allFacilities(){
        const facilities = await AdminUtilsModel.find({},{facilities:1})
        return facilities
    }
  
}   



export default AdminutilsRepository;
