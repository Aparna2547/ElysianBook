import Bookings from "../../domain_entites/booking";
import { UserModel } from "../database/userModel";
import { ParlourModel } from "../database/ParlourModel";
import IBookingRepository from "../../use_case/interface/bookingInterface";
import { BookingModel } from "../database/bookingModel";
import { Types } from "mongoose";


class bookingRepository implements IBookingRepository {


    async confirmBooking(bookingDetails: Bookings) {
        console.log('repo booking');
        try {
          const bookingData = await BookingModel.create(bookingDetails);
          console.log('booking successful');
          return bookingData;
        } catch (error) {
          console.error('Error in confirming booking:', error);
        }
      }

      async userBookings(userId:string,page:number){

        console.log('inside see repository')
        let limit = 4
        let skip =(page-1) * limit;
        let totalBookings = await BookingModel.find({}).countDocuments()
        console.log(totalBookings)
        let totalPages = Math.floor(totalBookings/limit)+1
        const bookingDetails = await BookingModel.find({userId}).populate('userId').populate('parlourId').skip(skip).limit(limit)
        // console.log('bookingdetials',bookingDetails)
        return {bookingDetails,totalPages}
      }

      async parlourDetails(parlourId:string){
        const parlourDetails = await ParlourModel.findById(parlourId,{seats:1})
        return parlourDetails
      }

      async bookingsOnDate(parlourId:string,date:string | Date){
        const bookingsOnDate = await BookingModel.find({date,parlourId})
        return bookingsOnDate
      }

      async cancelBooking(bookingId:string,reason:string){
        const booking  = await BookingModel.updateOne({_id:bookingId},{
          $set:{status:'cancelled',cancelReason:reason},
        },
        {
          upsert:true
        })
        const paymentId = await BookingModel.findOne({_id:bookingId},{payment_intent:1})
      return {paymentId}

      }


       //getting all bookings
   async allBookings(parlourId:string,page:number): Promise<any> {
    let limit = 4
    let skip = (page-1) * limit
    const totalBookings = await BookingModel.find({parlourId}).countDocuments()
    const totalPages = Math.floor(totalBookings/limit) 
    const bookingDetails = await BookingModel.find({parlourId}).populate('userId').populate('parlourId').sort({date:-1}).skip(skip).limit(limit)
    return {bookingDetails,totalPages}
  }
  async bookedSlots(parlourId: string, date: string) {
    const formattedDate = new Date(date);
  console.log('df',formattedDate,parlourId);
  
    // Find bookings for the specified parlour and date
    const data = await BookingModel.aggregate([
      { 
        $match: {
          date: formattedDate,
          parlourId: new Types.ObjectId(parlourId)
        }
      },
      { 
        $group: {
          _id: "$seatNo", // Group by seatNo
          bookings: {
            $push: "$$ROOT" // Push the entire document to the bookings array
          }
        }
      },
      { 
        $project: {
          _id: 0, // Exclude the _id field
          seatNo: "$_id", // Rename _id to seatNo
          bookings: 1 // Include the bookings array
        }
      }
    ]);
  
    console.log('dkasfjadgkdf', data);
    return data;
  }
  
  
  }


export default bookingRepository;
