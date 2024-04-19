import Parlour from "../../domain_entites/parlour"

interface IParlourRepository{
    saveParlour(parlour:Parlour):Promise<any>,
    findByEmail(email:string):Promise<any>,
    changePassword(email:string,password:string):Promise<any>,
    addParlour(parlourData:Parlour,vendorId:string):Promise<any>,
    editParlour(vendorId:string,parlourData:Parlour):Promise<any>,
    findParlourById(parlour:string):Promise<any>,
    findVendorById(vendorId:string):Promise<any>
    editVendorName(vendorId:string,name:string):Promise<any>,
    editVendorPassword(vendorId:string,hashedPassword:string):Promise<any>,
    editVendor(vendor:Parlour,vendorId:string):Promise<any>,
    dashboardDetails(parlourId:string):Promise<any>,
    getMonthlyCompletedBooking(parlourId:string,year:number):Promise<any>,
    addHolidays(parlourId:string,date:Date):Promise<any>,
}

export default IParlourRepository