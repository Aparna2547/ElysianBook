import { ServiceModel } from "../database/serviceModel";
import IServiceRepository from "../../use_case/interface/serviceInterface";
import { CategoryModel } from "../database/CategoryModel";

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

     async saveService(serviceName: string, category: string,duration:string, image: string): Promise<any> {
        console.log('inside serice repos')
        const newService = new ServiceModel({serviceName,category,duration,image})
        await newService.save();
        console.log('service added')
    }


    async categoriesToShow(){
        const showCategories = await CategoryModel.find({hide:false})
        // console.log(showCategories)
        return showCategories
    }
}

export default serviceRepository