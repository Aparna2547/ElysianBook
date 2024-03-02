import { PreProcessedFileInfo } from "typescript";
import Admin from "../../domain_entites/admin";

interface IAdminRepository{
    findByEmail(email:string):Promise<any>,
    blockUser(id:string):Promise<any>,
    getUser():Promise<any>,
    getVendor():Promise<any>,
    blockVendor(id:string):Promise<any>,
    getSingleParlourDetails(id:string):Promise<any>,
    parlourRequest(id:string,value:string):Promise<any>
}

export default IAdminRepository