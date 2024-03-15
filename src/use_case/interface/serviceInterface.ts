import { ObjectId } from "mongoose";

interface IServiceRepository{
findService(serviceName:string):Promise<any>,
saveService(serviceName:string,category:ObjectId,duration:string,description:string,price:number,image:string):Promise<any>,
categoriesToShow():Promise<any>;
showAllServices():Promise<any>;
}
export default IServiceRepository