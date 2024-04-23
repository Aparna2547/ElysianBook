import User from "../../domain_entites/user"

interface IUserRepository{
    saveUser(user:User):Promise<User>,
    findByEmail(email:string):Promise<any>,
    changePassword(email:string,password:string):Promise<any>,
    getParloursToShow(page:number,location:string):Promise<any>,
    getSingleParlourDetails(id:string):Promise<any>,
    getAllCategories():Promise<any>,
    findById(userId:string):Promise<any>,
    editUser(userId:string,user:User):Promise<any>,
    deleteProfilePicture(userId:string,image:string):Promise<any>,
    saveProfileImage(userId:string,imageLink:string):Promise<any>
    



}



export default IUserRepository