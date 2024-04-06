import Conversation from "../domain_entites/conversation";
import IconversationInterface from "./interface/conversationInterface";
import ImessageInterface from "./interface/messageInterface";
import IUserRepository from "./interface/userInterface";

class chatUseCase{
    private IUserRepository:IUserRepository;
    private IConversation : IconversationInterface;
    private IMessage : ImessageInterface

    constructor(
        IUserRepository:IUserRepository,
        IConversation : IconversationInterface,
        IMessage :ImessageInterface
    ){
        (this.IUserRepository=IUserRepository),
        (this.IConversation = IConversation),
        (this.IMessage = IMessage)
    }


    async newConversation(senderId:string,receiverId:string){
        const newConversation = await this.IConversation.save(senderId,receiverId)
        if(newConversation){
            return{
                status:200,
                data:newConversation
            }
        }else{
            return{
                status:401,
                data:"something went wrong"
            }
        }
    }

  

    async getConversations(id:string){
        const conversations = await this.IConversation.getConversation(id)
        return{
            status:200,
            data:conversations
        }
        
    }


    async getMessages(Id: string) {
        console.log(Id)
        const messages = await this.IMessage.getMessages(Id)
        if (messages) {
            return {
                status: 200,
                data: messages
            }
        } else {
            return {
                status: 401,
                data: "No messages"
            }
        }
    }

    async addMessage(message:object){
        try {
            const sendMessage = await this.IMessage.save(message)
            return {
                status:200,
                data:sendMessage
            }
        } catch (error) {
            return {status:500,data:"an error occured"}
        }
    }

    async findUserById(userId:string){
        try {
            const findUserById = await this.IConversation.findUserById(userId)
            return{
                status:200,
                data:findUserById
            }
        } catch (error) {
            console.log(error);
            
        }
    }


}
export default chatUseCase