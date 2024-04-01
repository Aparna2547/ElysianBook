import Bookings from "../domain_entites/booking";
import IBookingRepository from "./interface/bookingInterface";
import StripePayment from "../infrastucture/utils/stripe";
import SlotChecking from "../infrastucture/utils/SlotChecking";


class BookingUsecase{
    private bookingRepository : IBookingRepository;
    private stripePayment : StripePayment
    private slotChecking : SlotChecking


    constructor(bookingRepository:IBookingRepository,stripePayment:StripePayment,slotChecking:SlotChecking){
        this.bookingRepository = bookingRepository
        this.stripePayment = stripePayment
        this.slotChecking = slotChecking
    }


    async slotAvailability(bookingDetails:Bookings):Promise<number|boolean>{
        try {
            
            //checking slot availability
            console.log(bookingDetails.parlourId.toString());
            // console.log(new Date(bookingDetails.date));
            console.log(bookingDetails.date);
            
            
            
            //taking parlour details
            let parlourSeats = await this.bookingRepository.parlourDetails(bookingDetails.parlourId.toString())
            // console.log(seats);
            

            //taking all bookings of the same date
            const allBookings = await this.bookingRepository.bookingsOnDate(bookingDetails.parlourId.toString(),bookingDetails.date)
            console.log(allBookings)
            
            // const availableSlot = await this.slotChecking.slotAvailabilty(bookingDetails.startingTime,bookingDetails.endingTime,parlourSeats.seats,allBookings)
            // console.log('slot',availableSlot);
            
            // return availableSlot? availableSlot : false


            const availableSlot: boolean | number = await this.slotChecking.slotAvailabilty(
                bookingDetails.startingTime,
                bookingDetails.endingTime,
                parlourSeats.seats,
                allBookings
            );
            console.log('slot', availableSlot);
        
            return availableSlot; 

        } catch (error) {
            console.log(error);
            return false
            
        }
    }

    async proceedForPayment(bookingDetails:Bookings){
        console.log('proceed for payment');
        
        try {


            const payment = await this.stripePayment.makePayment(bookingDetails.totalPrice)
            console.log('payment',payment)
            return payment

        } catch (error) {
            console.log(error);
            
        }
    }

    async confirmBooking(bookingDetails:Bookings){
        console.log('confirm booking usecase');
        
        try {
            const  confirmBooking = await this.bookingRepository.confirmBooking(bookingDetails)
            return{
                status:200,
                data:confirmBooking
            }
        } catch (error) {
            console.log(error);
        }
    }

    //getting each user bookings 
    async userBookings(userId:string,page:number){
        try {
            console.log('bookings view case usser side');
            const userBookings = await this.bookingRepository.userBookings(userId,page)
            return{
                status:200,
                data:userBookings
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }

}

export default BookingUsecase