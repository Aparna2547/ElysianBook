import { ObjectId } from "mongoose";

interface IServiceRepository{
findService(serviceName:string):Promise<any>,
saveService(serviceName:string,category:ObjectId,duration:string,description:string,price:number,image:string):Promise<any>,
categoriesToShow():Promise<any>;
showAllServices(search:string,page:number):Promise<any>;
listService(id:string):Promise<any>
}
export default IServiceRepository