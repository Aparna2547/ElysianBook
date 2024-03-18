import User from "../../domain_entites/user";
import { UserModel } from "../database/userModel";
import IUserRepository from "../../use_case/interface/userInterface";
import { ParlourModel } from "../database/ParlourModel";


class userRepository implements IUserRepository{
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

    
    async getParloursToShow(page:number){
        let limit = 3
        let skip = (page - 1)* limit
        const totalParlours = await ParlourModel.find({status:{$eq:"Active"}}).countDocuments()
        const totalPages = Math.floor(totalParlours/limit)
        const parlours = await ParlourModel.find({status:{$eq:"Active"}}).skip(skip).limit(limit);
        // console.log('loo',parlours)
        return {parlours,totalPages}
    }


     async getSingleParlourDetails(id: string): Promise<any> {
     try {
            const parlourDetails = await ParlourModel.findOne({_id:id})
            console.log(parlourDetails)
            return parlourDetails
     } catch (error) {
        console.log(error);
        
     }   
    }

    async findById(userId:string){
        const profileDetails = await UserModel.findById(userId)
        return profileDetails
    }

     async editUser(userId: string, user: User): Promise<any> {
        const userEdit = await UserModel.findByIdAndUpdate(userId,user)
        console.log('edited');
        
        return userEdit
    }

    async deleteProfilePicture(userId:string,image:string){
        const deleteImage = await UserModel.updateOne({_id:userId},
            {$set:{image:''}})
        return deleteImage
    }

    async saveProfileImage(userId:string,imageLink:string){
        const imageChange = await UserModel.findOne({_id:userId},
            {$set:{image:imageLink}}
            )
            return imageChange;
    }
}

export default userRepository