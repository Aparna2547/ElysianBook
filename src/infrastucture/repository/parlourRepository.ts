import Parlour from "../../domain_entites/parlour";
import { ParlourModel } from "../database/ParlourModel";
import IParlourRepository from "../../use_case/interface/parlourInterface";


class parlourRepository implements IParlourRepository{
    async saveParlour(parlour:Parlour){
        const newParlour = new ParlourModel(parlour)
        await newParlour.save()
        return newParlour
    }

    async findByEmail(email: string){
        console.log('email exist check');
        const existingParlour = await ParlourModel.findOne({email})
        if(existingParlour){
            return existingParlour
        }else{
            return null
        }
        
    }

    async findVenorById(user: string) {
        const userFound = await ParlourModel.findById(user)
        return userFound
    }

    //change password
    async changePassword(email:string,password:string){
        const changePasswordStatus = await ParlourModel.updateOne({email},{$set:{password:password}})
        return changePasswordStatus
    }
}



export default parlourRepository