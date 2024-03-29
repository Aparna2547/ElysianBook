import { ServiceModel } from "../database/serviceModel";
import IServiceRepository from "../../use_case/interface/serviceInterface";
import { CategoryModel } from "../database/CategoryModel";
import { ObjectId } from "mongoose";
import { Types } from 'mongoose';

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

     async saveService(vendorId:string,serviceName: string, category: ObjectId,duration:number,description:string,price:number, image: string): Promise<any> {
        console.log('inside service repo')
        // // const newService = new ServiceModel({serviceName,category,duration,description,price,image})
        // // await newService.save();
        // const newService = await ServiceModel.updateOne({_id:vendorId},{serviceName,category,duration,description,price,image},{upsert:true})
        // console.log('service added',newService)
        // return newService


        // const filter = { _id: vendorId };
        const update = {
            vendorId,
            serviceName,
            category,
            duration,
            description,
            price,
            image
        };
        // const options = { upsert: true };
        
        const newService = await ServiceModel.insertMany( update,);
        console.log('service added', newService);
        return newService;
    }

  


    async categoriesToShow(){   
        const showCategories = await CategoryModel.find({hide:false})
        // console.log(showCategories)
        return showCategories
    }
    async showAllServices(vendorId: string, search: string, page: number) {
        console.log('allservice repo');
        const limit = 4;
        const skip = (page - 1) * limit;
    
        try {
            // Count total number of services for pagination
            const totalServices = await ServiceModel.find({ _id: vendorId }).countDocuments();
            const totalPages = Math.ceil(totalServices / limit);
    
            // Query services with pagination and search filter
            const allservices = await ServiceModel.find({
                vendorId: vendorId,
                serviceName: { $regex: search, $options: "i" }
            }).skip(skip).limit(limit).populate('category');
    
            return { allservices, totalPages };
        } catch (error) {
            console.error('Error fetching all services:', error);
            throw error;
        }
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

    //getting services and categories to user
    async getServicesInUser(id:string){ 
        try {
            const pipeline = [
                {
                  $match: {
                    vendorId: new Types.ObjectId(id),
                    isListed: true,
                  },
                },
                {
                  $lookup: {
                    from: 'categories', // Assuming 'categories' is the collection name for Category model
                    localField: 'category',
                    foreignField: '_id',
                    as: 'categoryDetails',
                  },
                },
                {
                    $group: {
                        _id: '$categoryDetails.catName', // Use category name instead of _id
                        services: {
                          $push: {
                            serviceName: '$serviceName',
                            duration: '$duration',
                            price: '$price',
                            image: '$image',
                            description: '$description',
                            isListed: '$isListed',
                            category: '$categoryDetails.name', // Include category name
                          },
                        },
                    },
                }
              ];
          
              const groupedServices = await ServiceModel.aggregate(pipeline);
              console.log('grou',groupedServices);
              return groupedServices
        } catch (error) {
            console.log(error);
            
        }
    }
}



export default serviceRepository