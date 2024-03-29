import { ObjectId } from "mongoose";

interface Services{
  id?:string,
  vendorId:ObjectId |string,
  serviceName:string,
  category:ObjectId | string,
  duration:number,
  isListed:boolean,
  description:string,
  price:number,
  image:string,

}
export default Services