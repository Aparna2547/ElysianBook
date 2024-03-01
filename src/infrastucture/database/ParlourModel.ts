import mongoose,{Document,Schema} from "mongoose"


interface Parlour extends Document{
    name:String,
    email:String,
    password:String,
    isBlocked:Boolean,
    parlourName:String,
    landmark:String,
    locality:String,
    district:String,
    openingTime:String,
    closingTime:String,
    contact:Number,
    seats:Number,
    latitude:Number,
    longitude:Number,
    facilities:String[],
    banners:Array<string>,
    status:String
}

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