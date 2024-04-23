"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class BookingUsecase {
    constructor(bookingRepository, stripePayment, slotChecking, schedulebooking) {
        this.bookingRepository = bookingRepository;
        this.stripePayment = stripePayment;
        this.slotChecking = slotChecking;
        this.schedulebooking = schedulebooking;
    }
    slotAvailability(bookingDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //checking slot availability
                console.log(bookingDetails.parlourId.toString());
                // console.log(new Date(bookingDetails.date));
                console.log(bookingDetails.date);
                //taking parlour details
                let parlourSeats = yield this.bookingRepository.parlourDetails(bookingDetails.parlourId.toString());
                // console.log(seats);
                //taking all bookings of the same date
                const allBookings = yield this.bookingRepository.bookingsOnDate(bookingDetails.parlourId.toString(), bookingDetails.date);
                console.log(allBookings);
                // const availableSlot = await this.slotChecking.slotAvailabilty(bookingDetails.startingTime,bookingDetails.endingTime,parlourSeats.seats,allBookings)
                // console.log('slot',availableSlot);
                // return availableSlot? availableSlot : false
                const availableSlot = yield this.slotChecking.slotAvailabilty(bookingDetails.startingTime, bookingDetails.endingTime, parlourSeats.seats, allBookings);
                console.log('slot', availableSlot);
                return availableSlot;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    proceedForPayment(bookingDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('proceed for payment');
            try {
                const payment = yield this.stripePayment.makePayment(bookingDetails.totalPrice);
                console.log('payment', payment);
                return payment;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    confirmBooking(bookingDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('confirm booking usecase');
            try {
                const confirmBooking = yield this.bookingRepository.confirmBooking(bookingDetails);
                // const res = await this.schedulebooking.SchedulingTask()
                // console.log('res',res)
                return {
                    status: 200,
                    data: confirmBooking
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //getting each user bookings 
    userBookings(userId, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('bookings view case usser side');
                const userBookings = yield this.bookingRepository.userBookings(userId, page);
                return {
                    status: 200,
                    data: userBookings
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    cancelBooking(bookingId, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cancelBooking = yield this.bookingRepository.cancelBooking(bookingId, reason);
                console.log('sdsd', cancelBooking);
                const refund = yield this.stripePayment.refundPayment(cancelBooking.paymentId.payment_intent);
                console.log('refund', refund);
                return {
                    status: 200,
                    data: cancelBooking
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //cancel booking by parlour
    cancelledByParlour(bookingId, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cancelBooking = yield this.bookingRepository.cancelledByParlour(bookingId, reason);
                const refund = yield this.stripePayment.refundPayment(cancelBooking.paymentId.payment_intent);
                console.log('refund ', refund);
                return {
                    status: 200,
                    data: cancelBooking
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //usecase for showing all bookings
    allBookings(parlourId, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingDetails = yield this.bookingRepository.allBookings(parlourId, page);
                return {
                    status: 200,
                    data: bookingDetails
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    bookedSlots(parlourId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookedSlots = yield this.bookingRepository.bookedSlots(parlourId, date);
                return {
                    status: 200,
                    data: bookedSlots
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getHolidays(parlourId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const holiday = yield this.bookingRepository.getHolidays(parlourId, date);
                return {
                    status: 200,
                    data: holiday
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = BookingUsecase;
