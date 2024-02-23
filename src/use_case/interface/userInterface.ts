import User from "../../domain/user";


interface UserRepository{
    saveUser(user:User):Promise<any>,
    findByEmail(email:string):Promise<any>,
    changePassword(email:string,password:string):Promise<any>
}


export default UserRepository