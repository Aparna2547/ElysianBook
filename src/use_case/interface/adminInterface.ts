import { PreProcessedFileInfo } from "typescript";
import Admin from "../../domain_entites/admin";

interface IAdminRepository{
    findByEmail(email:string):Promise<any>,
    blockUser(id:string):Promise<any>,
    getUser(search:string,page:number):Promise<any>,
    getParlours(search:string,page:number):Promise<any>,
    blockVendor(id:string):Promise<any>,
    getSingleParlourDetails(id:string):Promise<any>,
    parlourRequest(id:string,value:string):Promise<any>,
    totalDetails():Promise<any>;
}

export default IAdminRepository