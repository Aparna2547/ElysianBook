import { PreProcessedFileInfo } from "typescript";
import Admin from "../../domain/admin";

interface AdminRepository{
    findByEmail(email:string):Promise<any>,
    blockUser(id:string):Promise<any>,
    getUser():Promise<any>,
    getVendor():Promise<any>,
    blockVendor(id:string):Promise<any>
}

export default AdminRepository