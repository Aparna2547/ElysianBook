import Bookings from "../domain_entites/booking";
import IBookingRepository from "./interface/bookingInterface";


class BookingUsecase{
    private bookingRepository : IBookingRepository


    constructor(bookingRepository:IBookingRepository){
        this.bookingRepository = bookingRepository
    }



}

export default BookingUsecase