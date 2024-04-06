import ImessageInterface from "../../use_case/interface/messageInterface";
import MessageModel from "../database/messageModel";

class messageRepository implements ImessageInterface{
    async save(data: any): Promise<any> {
        const message = new MessageModel(data)
        const saveMessage = await message.save()
        console.log('savemess',saveMessage);
        
        if (saveMessage) {
            return saveMessage
        } else {
            return null
        }
    }

    async getMessages(id: string): Promise<any> {
        const messages = await MessageModel.find({ conversationId: id })
        if (messages) {
            return messages
        } else {
            return null
        }
    }

    async getLastMessages(): Promise<any> {
        try {
            const lastMessages = await MessageModel.aggregate([
                {
                    $sort: { createdAt: -1 }, 
                },
                {
                    $group: {
                        _id: "$conversationId",
                        lastMessage: { $first: "$$ROOT" },
                    },
                },
                {
                    $replaceRoot: { newRoot: "$lastMessage" },
                },
            ]);

            return lastMessages;
        } catch (error) {
            console.error("Error fetching last messages:", error);
        }
    };
    
}


export default messageRepository