import mongoose, {Document,Schema} from "mongoose";
import Services from "../../domain_entites/services";



const serviceSchema : Schema<Services> = new mongoose.Schema({
    serviceName:{
        type:String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'category'
    },
    duration:{
        type:Number,
    },
    isListed:{
        type:Boolean
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    image:{
        type:String
    }
})

const ServiceModel = mongoose.model<Services>('services',serviceSchema)
export {ServiceModel}