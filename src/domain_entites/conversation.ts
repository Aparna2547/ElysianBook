import { Document } from "mongoose";

interface Member{
    userId:string,
    receiverId:string
}

interface Conversation{
    members:Array<string>;
}

export default Conversation