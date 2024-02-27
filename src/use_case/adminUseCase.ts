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
                const passwordMatch = await this.Encrypt.compare(admin.password,adminFound.password)
                console.log('oasswordmatch');
                if(passwordMatch){
                    const token = this.JWTtokens.createJwt(adminFound._id,'admin')
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
    async getUser(){
        try {
            const users = await this.adminRepository.getUser()
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
    async getVendor(){
        try {
            
            const vendors = await this.adminRepository.getVendor()
            return {
                status:200,
                data:vendors
            }
        } catch (error) {
            console.log(error);
            
        }
    }

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

}




export default Adminusecase