import Admin from "../domain_entites/admin";
import AdminRepository from "./interface/adminInterface";
import JWTtokens from "../infrastucture/utils/JWTtokens";
import Encrypt from "../infrastucture/utils/hashPassword";


class Adminusecase{
    private adminRepository : AdminRepository
    private Encrypt : Encrypt
    private JWTtokens : JWTtokens



    constructor(adminRepository:AdminRepository,Encrypt:Encrypt,JWTtokens:JWTtokens){
        this.adminRepository =adminRepository
        this.Encrypt = Encrypt
        this.JWTtokens = JWTtokens
    }



    //admin Login

    async adminLogin(admin:any){
        try {
            console.log('admin usecase');
            const adminFound = await this.adminRepository.findByEmail(admin.email)
            if(adminFound){
                // const passwordMatch = await this.Encrypt.compare(admin.password,adminFound.password)
                console.log('oasswordmatch');
                if(admin.password == adminFound.password){
                    // if(passwordMatch){
                    const token = this.JWTtokens.createJwt(adminFound._id,'admin')
                    console.log('tpken',token);
                    
                    return{
                        status:200,
                        data:{
                            success:true,
                            message:'successfully logged in',
                            adminId:adminFound._id,
                            token:token
                        }
                    }
                }else{
                    return{
                        status:200,
                        data:{
                            success:false,
                            message:'invalid credentials'
                        }
                }
                }
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }

    //all users
    async getUser(search:string,page:number){
        try {
            const users = await this.adminRepository.getUser(search,page)
            return{
                status:200,
                data:users
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    //admin user block

    async blockUser(id:string){
        try {
            console.log('usecase',id)
            const userStatus = await this.adminRepository.blockUser(id)
            return{
                status:200,
                data:userStatus
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    //show all vendors
    // async getVendor(search:string,page:number){
    //     try {
            
    //         const vendors = await this.adminRepository.getVendor(search,page)
    //         return {
    //             status:200,
    //             data:vendors
    //         }
    //     } catch (error) {
    //         console.log(error);
            
    //     }
    // }

    //block vendor
    async blockVendor(id:string){
        try {
            console.log('block user usecsase');
            const vendorStatus = await this.adminRepository.blockVendor(id)
            return{
                status:200,
                data:vendorStatus
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }


    async getParlours(search:string,page:number){
        try {
            console.log("getparlour usecase");
            const parlourStatus = await this.adminRepository.getParlours(search,page)
            return{
                status:200,
                data:parlourStatus
            }
        } catch (error) {
            console.log(error);
        }
    }

    async singleParlour(id:string){
        try {
            console.log('singleparlor')
            const singleParlour = await this.adminRepository.getSingleParlourDetails(id)
            return {
                status:200,
                data:singleParlour
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    async parlourRequestConfirmation(id:string,value:string){
        try {
            console.log('inside parlourRequestConfirmation usecase')
            const parlourRequest = await this.adminRepository.parlourRequest(id,value)
            return {
                status:200,
                data:parlourRequest
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    async totalDetails(){
        try {
            console.log('hello')
            const totalDetails = await this.adminRepository.totalDetails()
            return{
                status:200,
                data:totalDetails
            }
        } catch (error) {
            console.log(error);
            return {
                status:500,
                data:'internal server error'
            }
            
        }
    }

    async monthlyData(year:number){
        try {
            const res = await this.adminRepository.monthlyData(year)
            return{
                status:200,
                data:res
            }
        } catch (error) {
            return{
                status:401,
                data:'internal server error'
            }
        }
    }
}




export default Adminusecase