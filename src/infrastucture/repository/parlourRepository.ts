import Parlour from "../../domain/parlour";
import { ParlourModel } from "../database/ParlourModel";
import ParlourRepository from "../../use_case/interface/parlourInterface";


class parlourRepository implements ParlourRepository{
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
}


export default parlourRepository