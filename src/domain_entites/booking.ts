import { ObjectId } from "mongoose";

interface Bookings{
    id:string,
    userId:ObjectId,
    parlourId:ObjectId,
    startingTime:string,
    endingTime:string,
    totalDuration:number,
    date:Date,
    totalPrice:number,
    services:object;
    status:string;
    seatNo:number;
    payment_intent:string;
    cancelReason:string
}

export default Bookings