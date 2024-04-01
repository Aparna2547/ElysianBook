import mongoose,{Document,Schema} from "mongoose"
import Bookings from "../../domain_entites/booking"

const bookingSchema : Schema<Bookings> = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    parlourId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'parlour'
    },
    startingTime:{
        type:String
    },
    endingTime:{
        type:String
    },
    totalDuration:{
        type:Number
    },
    date:{
        type:Date
    },
    totalPrice:{
        type:Number
    },
    services:{
        type:Object
    },
    status:{
        type:String,
        default:"confirmed"
    },
    seatNo:{
        type:Number
    },
    paymentId:{
        type:String
    }
})

const BookingModel = mongoose.model<Bookings>('bookings',bookingSchema)
export {BookingModel}