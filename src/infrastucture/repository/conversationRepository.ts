import Conversation from "../../domain_entites/conversation";
import IconversationInterface from "../../use_case/interface/conversationInterface";
import { conversationModel } from "../database/conversation";
import { UserModel } from "../database/userModel";

interface Member{
    userId:string;
    lastSeen?:Date | undefined
}

class conversationRepository implements IconversationInterface{

    async save(senderId:string,receiverId:string):Promise<any>{
        try {

            const conversationFound =  await conversationModel.findOne({members:{$all:[senderId,receiverId]}})
            if(conversationFound){
                return conversationFound
            }

            const newConversation = new conversationModel({members:[senderId,receiverId]})
            return await newConversation.save();
            
        } catch (error) {
            
        }
    }

   

    
    

         async getConversation(id: string): Promise<any> {
            const conversations = await conversationModel.find({members:{$in:[id]}})
            console.log('conversations',conversations);
            if(conversations){
                return conversations
            }else{
                return null
            }
            
        }


        async updateUserLastSeen(userId:string,data:Date){
            try {
                const updateResult = await conversationModel.updateMany(
                    { "members.userId": userId },
                    { $set: { "members.$.lastSeen": data } },
                    { multi: true }
                );
                if (updateResult.matchedCount === 0) {
                    return {
                        status: 404,
                        data: "User not found in any conversation."
                    };
                }
    
                return {
                    status: 200,
                    data: "User's lastSeen updated successfully."
                };
            } catch (error) {
                console.log(error)
                return {
                    status: 500,
                    data: "Failed to update user's lastSeen."
                };
            }
        }
    
         async findUserById(userId: string): Promise<any> {
            try {
                const findUserById = await UserModel.findById(userId,{name:1})
                console.log('kdnf',findUserById)
                return findUserById
            } catch (error) {
                console.log(error);
                
            }
        }
}
export default conversationRepository