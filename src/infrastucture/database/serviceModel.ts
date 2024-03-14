import mongoose, {Document,Schema} from "mongoose";
import Services from "../../domain_entites/services";



const serviceSchema : Schema<Services> = new mongoose.Schema({
    serviceName:{
        type:String,
    },
    category:{
        type:String,
        ref:'Category'
    },
    duration:{
        type:String,
    },
    isListed:{
        type:Boolean
    },
    image:{
        type:String
    }
})

const ServiceModel = mongoose.model<Services>('services',serviceSchema)
export {ServiceModel}