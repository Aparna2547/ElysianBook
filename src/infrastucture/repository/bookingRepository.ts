import Bookings from "../../domain_entites/booking";
import { UserModel } from "../database/userModel";
import { ParlourModel } from "../database/ParlourModel";
import IBookingRepository from "../../use_case/interface/bookingInterface";
import { BookingModel } from "../database/bookingModel";

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
        let limit = 3
        let skip =(page-1) * limit;
        let totalBookings = await BookingModel.find({}).countDocuments()
        let totalPages = Math.floor(totalBookings/limit)
        const bookingDetails = await BookingModel.find({userId}).populate('userId').populate('parlourId').skip(skip).limit(limit)
        console.log('bookingdetials',bookingDetails)
        return bookingDetails
      }

      async parlourDetails(parlourId:string){
        const parlourDetails = await ParlourModel.findById(parlourId,{seats:1})
        return parlourDetails
      }

      async bookingsOnDate(parlourId:string,date:string | Date){
        const bookingsOnDate = await BookingModel.find({date,parlourId})
        return bookingsOnDate
      }
}
export default bookingRepository;
