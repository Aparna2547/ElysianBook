import User from "../../domain/user";
import { UserModel } from "../database/userModel";
import UserRepository from "../../use_case/interface/userInterface";


class userRepository implements UserRepository{
    async saveUser(user:User){
        const newUser = new UserModel(user)
        await newUser.save()
        return newUser
    }


    //checking email is in databse
    async findByEmail(email: string) {
        console.log('email exist check');
        const existingUser = await UserModel.findOne({email})
        if(existingUser){
            return existingUser
        }else{
            return null
        }
    }
  
}

export default userRepository