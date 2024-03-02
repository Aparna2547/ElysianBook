import User from "../../domain_entites/user"

interface IUserRepository{
    saveUser(user:User):Promise<any>,
    findByEmail(email:string):Promise<any>,
    changePassword(email:string,password:string):Promise<any>,
    getParloursToShow(page:number):Promise<any>
}


export default IUserRepository