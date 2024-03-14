import mongoose,{Document,Schema} from "mongoose";
import AdminUtils from "../../domain_entites/adminUtils";

// interface AdminUtils extends Document{
//   facilities : Array<string> | null;
// }

const adminUtils: Schema<AdminUtils> = new mongoose.Schema({
  facilities:{
    type:Array
  }
})

const AdminUtilsModel = mongoose.model<AdminUtils>("facilities",adminUtils)
export {AdminUtilsModel}  