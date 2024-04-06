interface IconversationInterface{
    save(senderId:string,receiverId:string):Promise<any>,
    updateUserLastSeen(id:string,data:Date):Promise<any>,
    getConversation(id:string):Promise<any>,
    findUserById(userId:string):Promise<any>
}
export default IconversationInterface