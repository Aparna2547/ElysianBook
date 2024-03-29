import IServiceRepository from "./interface/serviceInterface"
import Cloudinary from "../infrastucture/utils/cloudinary"
import { ObjectId } from "mongoose"

class Serviceusecase{
    private serviceRepository : IServiceRepository
    private cloudinary :Cloudinary


    constructor(serviceRepository:IServiceRepository,cloudinary:Cloudinary){
        this.serviceRepository = serviceRepository
        this.cloudinary  = cloudinary
    }



    async addService(venodrId:string,serviceName:string,category:ObjectId,duration:number,description:string,price:number,image:object){
        try {
            console.log('service add usecase')
            const serviceFound = await this.serviceRepository.findService(serviceName);
            if(serviceFound){
                console.log('service already exist')
                return {
                    status:200,
                    data:false
                }

            }else{
                const imageLink = await this.cloudinary.saveToCloudinary(image)
                console.log(imageLink);

                const serviceSave = await this.serviceRepository.saveService(venodrId,serviceName,category,duration,description,price,imageLink)
                return{
                    status:200,
                    data:serviceSave
                }
                
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    async categoriesToShow(){
        try {
            console.log('serviceusecase')
            const showCategories = await this.serviceRepository.categoriesToShow()
            return{
                status:200,
                data:showCategories
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    async showAllServices(vendorId:string,search:string,page:number){
        try {
            console.log('inside allsercice usecase');
            const showAllServices = await this.serviceRepository.showAllServices(vendorId,search,page);
            return{
                status:200,
                data:showAllServices
            }            
        } catch (error) {
            console.log(error);
            
        }
    }

    //listing
    async listService(id:string){
        try {
            console.log('usecaSe ',id);
            const serviceStatus = await this.serviceRepository.listService(id)
            return{
                status:200,
                data:serviceStatus
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }

    //editing
    async editService(id:string,serviceName:string,category:ObjectId,duration:number,price:number,description:string,image:object){
        try {
            const serviceFound = await this.serviceRepository.findServiceById(id)
            let imageLink;
            if(image){
                imageLink = await this.cloudinary.saveToCloudinary(image)
                console.log(imageLink);
                
            }else{
                imageLink = serviceFound.image
            }

            const editedData = await this.serviceRepository.editService(id,serviceName,category,duration,price,description,imageLink)
            return{
                status:200,
                data:editedData
            }
        } catch (error) {
         console.log(error);
            
        }
    }


    async getServicesInUser(id:string){
        try {
            console.log('in usecase')
            const servicesInUser  = await this.serviceRepository.getServicesInUser(id)
            return {
                status:200,
                data:servicesInUser
            }
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default Serviceusecase