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

    async showAllServices(){
        console.log('allservice repo');
        const allservices = await ServiceModel.find({})
        console.log(allservices);
        
        return allservices
        
    }
}



export default serviceRepository