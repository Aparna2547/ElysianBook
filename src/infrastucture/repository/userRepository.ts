import User from "../../domain_entites/user";
import { UserModel } from "../database/userModel";
import UserRepository from "../../use_case/interface/userInterface";


class userRepository implements UserRepository{
    async saveUser(user:User){
        const newUser = new UserModel(user)
        await newUser.save()
        return newUser
    }

    //for middleware
    async findUserById(user: string) {
        const userFound = await UserModel.findById(user)
        return userFound
    }

    // //checking email is in databse
    async findByEmail(email: string) {
        // console.log('email',email);
        console.log('email exist check');
        const existingUser = await UserModel.findOne({email:email})
        // console.log(existingUser,'asdjk');
        
        
        if(existingUser){
            return existingUser
        }else{
            return null
        }
    }


  //change password
    async changePassword(email:string,password:string){
        const changePasswordStatus = await UserModel.updateOne({email},{$set:{password:password}}) 
        console.log(changePasswordStatus,'kjhkhkjkjh');
         
        return changePasswordStatus;
    }

    
}

export default userRepository