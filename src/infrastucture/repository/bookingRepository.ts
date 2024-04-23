import Bookings from "../../domain_entites/booking";
import { UserModel } from "../database/userModel";
import { ParlourModel } from "../database/ParlourModel";
import IBookingRepository from "../../use_case/interface/bookingInterface";
import { BookingModel } from "../database/bookingModel";
import { Types } from "mongoose";

class bookingRepository implements IBookingRepository {


  async confirmBooking(bookingDetails: Bookings) {
    console.log("repo booking");
    try {
      const bookingData = await BookingModel.create(bookingDetails);
      console.log("booking successful");
      console.log(new Date())
      return bookingData;
    } catch (error) {
      console.error("Error in confirming booking:", error);
    }
  }

  async userBookings(userId: string, page: number) {
    console.log("inside see repository");
    let limit = 4;
    let skip = (page - 1) * limit;
    let totalBookings = await BookingModel.find({}).countDocuments();
    console.log(totalBookings);
    let totalPages = Math.floor(totalBookings / limit) + 1;
    const bookingDetails = await BookingModel.find({ userId })
      .populate("userId")
      .populate("parlourId")
      .skip(skip)
      .limit(limit);
    // console.log('bookingdetials',bookingDetails)
    return { bookingDetails, totalPages };
  }

  async parlourDetails(parlourId: string) {
    const parlourDetails = await ParlourModel.findById(parlourId, { seats: 1 });
    return parlourDetails;
  }

  async bookingsOnDate(parlourId: string, date: string | Date) {
    const bookingsOnDate = await BookingModel.find({ date, parlourId });
    return bookingsOnDate;
  }

  async cancelBooking(bookingId: string, reason: string) {
    const booking = await BookingModel.updateOne(
      { _id: bookingId },
      {
        $set: { status: "cancelled", cancelReason: reason },
      },
      {
        upsert: true,
      }
    );
    const paymentId = await BookingModel.findOne(
      { _id: bookingId },
      { payment_intent: 1 }
    );
    return { paymentId };
  }


  //cancelled by parlour
  async cancelledByParlour(bookingId: string, reason: string): Promise<any> {
    const data = await BookingModel.updateOne(
      {_id:bookingId},
      {
        $set: {status: "cancelledByParlour",cancelReason:reason}
      },
      {$upsert: true}
    );
    const paymentId = await BookingModel.findOne(
      {_id:bookingId},
      {payment_intent:1}
    )
  return {paymentId}    
  }

  //getting all bookings
  async allBookings(parlourId: string, page: number): Promise<any> {
    let limit = 4;
    let skip = (page - 1) * limit;
    const totalBookings = await BookingModel.find({
      parlourId,
    }).countDocuments();
    const totalPages = Math.floor(totalBookings / limit);
    const bookingDetails = await BookingModel.find({ parlourId })
      .populate("userId")
      .populate("parlourId")
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);
    return { bookingDetails, totalPages };
  }
  async bookedSlots(parlourId: string, date: string) {
    const formattedDate = new Date(date);
    console.log("df", formattedDate, parlourId);

    // Find bookings for the specified parlour and date
    const data = await BookingModel.aggregate([
      {
        $match: {
          date: formattedDate,
          parlourId: new Types.ObjectId(parlourId),
        },
      },
      {
        $group: {
          _id: "$seatNo", // Group by seatNo
          bookings: {
            $push: "$$ROOT", // Push the entire document to the bookings array
          },
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          seatNo: "$_id", // Rename _id to seatNo
          bookings: 1, // Include the bookings array
        },
      },
    ]);

    const holiday = await ParlourModel.find({
      _id: parlourId,
      holidays: { $in: [formattedDate] }
    });
        console.log('holiday',holiday)



    // console.log("dkasfjadgkdf", data);
    return {data,holiday};
  }

  async getHolidays(parlourId: string, date: string) {
    // Convert the input date string to a Date object
    const [year, month, day] = date.split('-').map(Number);
    const dateObject = new Date(year, month - 1, day);
  
    // Format the date object to match the format in the MongoDB documents
    const formattedDate = dateObject.toISOString().split('T')[0];
  
    console.log('Formatted Date:', formattedDate);
  
    try {
      // Match documents where the formatted date is in the 'holidays' array
      const holidays = await ParlourModel.aggregate([
        {
          $match: {
            _id: new Types.ObjectId(parlourId),
            holidays: formattedDate
          }
        },
        {
          $project: {
            _id: 0,
            holidays: 1
          }
        }
      ]);
  
      console.log('Holidays:', holidays);
      return holidays;
    } catch (error) {
      console.error('Error fetching holidays:', error);
      throw error;
    }
  }
  
}

export default bookingRepository;
