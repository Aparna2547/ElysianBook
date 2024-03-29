import mongoose,{Document,Schema} from "mongoose"
import Admin from "../../domain_entites/admin"


// interface Admin extends Document{
//     email:String,
//     password:String,
// }

const adminSchema : Schema<Admin> = new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    }
})

const adminModel = mongoose.model<Admin>('admin',adminSchema)

export {adminModel}