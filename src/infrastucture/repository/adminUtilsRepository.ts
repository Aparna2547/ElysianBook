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
  
    async addBanner(imageLink:any){
        console.log('linkh',imageLink);
        
        const bannerAdd = await AdminUtilsModel.findOneAndUpdate(
            {},
            { $push: { banners: { $each: imageLink } } },
            { upsert:true,new: true }
        );      
          console.log('completed',bannerAdd);
        
        return bannerAdd
    }

    async getBanners():Promise<any>{
        const banners = await AdminUtilsModel.find({},{banners:1}) 
        return banners
    }

    async deleteBanner(banner:string){
        const bannerDelete = await AdminUtilsModel.updateOne({},{
            $pull:{banners:banner}
        })
        console.log('deleted')
        return bannerDelete
    }
}   



export default AdminutilsRepository;
