import mongoose,{Document,Schema} from "mongoose"
import Parlour from "../../domain_entites/parlour"



const parlourSchema : Schema<Parlour> = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    vendorImage:{
        type:String
    },
    parlourName:{
        type:String
    },
    landmark:{
        type:String
    },
    locality:{
        type:String
    },
    district:{
        type:String
    },
    openingTime:{
        type:String
    },
    closingTime:{
        type:String
    },
    contact:{
        type:Number
    },
    seats:{
        type:Number
    },
    latitude:{
        type:Number,
    },
    longitude:{
        type:Number
    },
    facilities:{
        type:[String],
        default:[]
    },
    banners:{
        type:[String]
    },
    status:{
        type:String,
        default:"Registered"
    }

})

const ParlourModel = mongoose.model<Parlour>('parlour',parlourSchema)
export {ParlourModel}