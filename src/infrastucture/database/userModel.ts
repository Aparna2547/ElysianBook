import mongoose,{Document,Schema} from "mongoose";
import User from "../../domain_entites/user";

// interface User extends Document{
//     name:String,
//     email:String,
//     password:String
//     isBlocked:Boolean
// }

const userSchema : Schema<User> = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    image:{
      type:String  
    }

})

const UserModel = mongoose.model<User>('user',userSchema)
export {UserModel}