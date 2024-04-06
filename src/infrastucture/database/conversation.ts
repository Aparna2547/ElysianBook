import mongoose,{Document,Schema} from "mongoose"
import Conversation from "../../domain_entites/conversation"




const conversationSchema : Schema<Conversation> = new mongoose.Schema({
    members:{
        type:[String]
    }
},{
    timestamps:true
}
)

const conversationModel = mongoose.model<Conversation>('conversation',conversationSchema)

export {conversationModel}