import mongoose,{Document,Schema} from "mongoose";
import Message from "../../domain_entites/message";

const messgaeSchema = new Schema<Message>({
    conversationId:{
        type:String
    },
    senderId:{
        type:String
    },
    text:{
        type:String
    }
},{timestamps:true})

const messageModel = mongoose.model<Message>('message',messgaeSchema)
export default messageModel