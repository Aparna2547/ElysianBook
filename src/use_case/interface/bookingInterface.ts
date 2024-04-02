import Bookings from "../../domain_entites/booking";


interface IBookingRepository{
confirmBooking(bookingDetails:Bookings):Promise<any>,
userBookings(userId:string,page:number):Promise<any>,
parlourDetails(parlourId:string):Promise<any>,
bookingsOnDate(parlourId:string,date:string|Date):Promise<any>,
cancelBooking(bookingId:string,reason:string):Promise<any>,
allBookings(parlourId:string,page:number):Promise<any>,   
bookedSlots(parlourId:string,date:string):Promise<any>

}
export default IBookingRepository