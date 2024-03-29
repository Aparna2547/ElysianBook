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
}

export default Bookings