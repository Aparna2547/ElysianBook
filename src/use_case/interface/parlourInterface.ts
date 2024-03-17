import Parlour from "../../domain_entites/parlour"

interface IParlourRepository{
    saveParlour(parlour:Parlour):Promise<any>,
    findByEmail(email:string):Promise<any>,
    changePassword(email:string,password:string):Promise<any>,
    addParlour(parlourData:Parlour,vendorId:string):Promise<any>,
    findParlourById(parlour:string):Promise<any>,
    findVendorById(vendorId:string):Promise<any>
    editVendorName(vendorId:string,name:string):Promise<any>,
    editVendorPassword(vendorId:string,hashedPassword:string):Promise<any>
}

export default IParlourRepository