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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class bookingController {
    constructor(bookingusecase) {
        this.bookingusecase = bookingusecase;
    }
    proceedForPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('hello inside booking controller');
                let userId;
                const token = req.cookies.userJWT;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    userId = decoded.id;
                }
                const parlourId = req.query.id;
                //    console.log('user-',userId,'parlour',parlourId)
                const { bookingDetails } = req.body;
                bookingDetails.parlourId = parlourId;
                bookingDetails.userId = userId;
                //    console.log(bookingDetails)
                //converting time to zero
                console.log(bookingDetails);
                const convertedDate = new Date(bookingDetails.date);
                convertedDate.setDate(convertedDate.getDate() + 1);
                convertedDate.setUTCHours(0, 0, 0, 0);
                console.log('bookeddate', convertedDate.toISOString());
                bookingDetails.date = convertedDate.toISOString();
                //    req.app.locals.bookingDetails = bookingDetails
                const slotAvailability = yield this.bookingusecase.slotAvailability(bookingDetails);
                if (!slotAvailability) {
                    return res.status(401).json({ message: "No slots available" });
                }
                else {
                    const paymentStatus = yield this.bookingusecase.proceedForPayment(bookingDetails);
                    bookingDetails.seatNo = slotAvailability;
                    bookingDetails.paymentId = paymentStatus;
                    req.app.locals.bookingDetails = bookingDetails;
                    res.status(200).json(paymentStatus);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //     async confirmBooking(req:Request,res:Response){
    //         try {
    //             // console.log('controleerr',req.app.locals.bookingDetails);
    //             console.log('jijijij');
    //         //   console.log(req.body.data.object.payment_intent);
    //         const bookingDetails = req.app.locals.bookingDetails
    //         bookingDetails.payment_intent = req.body.data.object.payment_intent;
    //         console.log(bookingDetails);
    //       if(req.body.data.object.status=='complete'){
    //         const confirmBooking = await this.bookingusecase.confirmBooking(bookingDetails)
    //         res.status(200).json(confirmBooking)
    //       }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    confirmBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('jijijij');
                // Ensure bookingDetails is initialized
                let bookingDetails = req.app.locals.bookingDetails;
                if (!bookingDetails) {
                    // Initialize bookingDetails if it's not already set
                    bookingDetails = {}; // Or set it to a default object structure
                    req.app.locals.bookingDetails = bookingDetails;
                }
                // Now you can safely set the payment_intent property
                bookingDetails.payment_intent = req.body.data.object.payment_intent;
                console.log(bookingDetails);
                if (req.body.data.object.status == 'complete') {
                    const confirmBooking = yield this.bookingusecase.confirmBooking(bookingDetails);
                    res.status(200).json(confirmBooking);
                }
            }
            catch (error) {
                console.log(error);
                // Consider sending an error response here
                res.status(500).json({ error: 'An error occurred while confirming the booking.' });
            }
        });
    }
    allUserBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('inside controller');
                let userId;
                const token = req.cookies.userJWT;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    userId = decoded.id;
                }
                console.log('userid', userId);
                const page = parseInt(req.query.page);
                console.log(page);
                const userBookings = yield this.bookingusecase.userBookings(userId, page);
                res.status(200).json(userBookings);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    cancelBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('helloooooo');
                const reason = req.body.reason;
                const bookingId = req.query.bookingId;
                console.log(reason, bookingId);
                const cancelBooking = yield this.bookingusecase.cancelBooking(bookingId, reason);
                res.status(200).json(cancelBooking);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //for showing all bookings
    allBookings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let parlourId;
                const token = req.cookies.vendorJWT;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    parlourId = decoded.id;
                }
                console.log(parlourId);
                const page = parseInt(req.query.page);
                const bookingDetails = yield this.bookingusecase.allBookings(parlourId, page);
                res.status(200).json(bookingDetails);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //cancelled by admin
    cancelledByParlour(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingId = req.query.bookingId;
                const reason = req.query.reason;
                const cancelledData = yield this.bookingusecase.cancelledByParlour(bookingId, reason);
                res.status(200).json(cancelledData);
            }
            catch (error) {
                res.status(500).json('internal server error');
            }
        });
    }
    //showig slots
    bookedSlots(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parlourId = req.query.parlourId;
                const dateString = new Date(req.query.date);
                // console.log('daya',dateString)
                const date = dateString.toISOString().split('T')[0];
                // console.log(date);
                // const convertedDate = new Date(date)
                // convertedDate.setDate(convertedDate.getDate()+1)
                // convertedDate.setUTCHours(0, 0, 0, 0);
                // console.log('bookeddate',convertedDate.toISOString())
                const slots = yield this.bookingusecase.bookedSlots(parlourId, date);
                res.status(200).json(slots);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getHolidays(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('get holidays', req.query.date);
                const parlourId = req.query.parlourId;
                const dateString = new Date(req.query.date);
                console.log('daya', dateString);
                const date = dateString.toISOString().split('T')[0];
                console.log(date);
                const data = yield this.bookingusecase.getHolidays(parlourId, date);
                res.status(200).json(data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = bookingController;
