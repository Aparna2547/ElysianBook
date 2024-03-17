import { ServiceModel } from "../database/serviceModel";
import IServiceRepository from "../../use_case/interface/serviceInterface";
import { CategoryModel } from "../database/CategoryModel";
import { ObjectId } from "mongoose";

class serviceRepository implements IServiceRepository{

    async findService(serviceName:string){
        console.log('imnside service repositoru');
        const existingService = await ServiceModel.findOne({serviceName:serviceName})
        if(existingService){
            return existingService
        }else{
            return null
        }
    }

     async saveService(serviceName: string, category: ObjectId,duration:string,description:string,price:number, image: string): Promise<any> {
        console.log('inside service repo')
        const newService = new ServiceModel({serviceName,category,duration,description,price,image})
        await newService.save();
        console.log('service added')
        return newService
    }

  


    async categoriesToShow(){
        const showCategories = await CategoryModel.find({hide:false})
        // console.log(showCategories)
        return showCategories
    }

    async showAllServices(search:string,page:number){
        console.log('allservice repo');
        let limit = 4;
        let skip = (page -1) * limit;
        let totalServices = await ServiceModel.find({}).countDocuments();
        let totalPages = Math.floor(totalServices/limit)

        const allservices = await ServiceModel.find({
            serviceName : {$regex : '^' + search,$options : "i"}
        }).skip(skip).limit(limit).populate('category');
        // console.log(allservices);    
        return {allservices,totalPages}
        
    }

    async listService(id: string) {
        console.log('repo', id);
        const service = await ServiceModel.findById(id);
        if (service) {
            service.isListed = !service.isListed;
            await service.save();
            console.log(service);
        } else {
            console.log('Service not found');
        }
    }
    

    //editing
    async findServiceById (id:string){
        console.log('findservicebyid',id);
        const existingService = await ServiceModel.findById({_id:id})
        if(existingService){
            return existingService
        }else{
            return null
        }
    }

    async editService(id:string,serviceName:string,category:ObjectId,duration:number,price:number,description:string,image:string){
        try {
            const editService = await ServiceModel.updateOne(
                {_id:id},
                {$set:{
                    serviceName,
                    category,
                    duration,
                    price,
                    description,
                    image
                }}
            )
            return editService
        } catch (error) {
            console.log(error);
            
        }
    }
}



export default serviceRepository