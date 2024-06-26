import { ObjectId } from "mongoose";

interface IServiceRepository{
findService(serviceName:string):Promise<any>,
saveService(vendorId:string,serviceName:string,category:ObjectId,duration:number,description:string,price:number,image:string):Promise<any>,
categoriesToShow():Promise<any>;
showAllServices(vendorId:string,search:string,page:number):Promise<any>;
findServiceById(id:string):Promise<any>;
editService(id:string,serviceName:string,category:ObjectId,duration:number,price:number,description:string,image:string):Promise<any>;
listService(id:string):Promise<any>;
getServicesInUser(id:string):Promise<any>
}
export default IServiceRepository