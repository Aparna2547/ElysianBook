import mongoose,{Document,Schema} from "mongoose"


interface Parlour extends Document{
    name:String,
    email:String,
    password:String,
    isBlocked:Boolean
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
    }
})

const ParlourModel = mongoose.model<Parlour>('parlour',parlourSchema)
export {ParlourModel}