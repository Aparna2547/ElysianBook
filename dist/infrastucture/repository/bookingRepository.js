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
const ParlourModel_1 = require("../database/ParlourModel");
const bookingModel_1 = require("../database/bookingModel");
const mongoose_1 = require("mongoose");
class bookingRepository {
    confirmBooking(bookingDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("repo booking");
            try {
                const bookingData = yield bookingModel_1.BookingModel.create(bookingDetails);
                console.log("booking successful");
                console.log(new Date());
                return bookingData;
            }
            catch (error) {
                console.error("Error in confirming booking:", error);
            }
        });
    }
    userBookings(userId, page) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("inside see repository");
            let limit = 4;
            let skip = (page - 1) * limit;
            let totalBookings = yield bookingModel_1.BookingModel.find({}).countDocuments();
            console.log(totalBookings);
            let totalPages = Math.floor(totalBookings / limit) + 1;
            const bookingDetails = yield bookingModel_1.BookingModel.find({ userId })
                .populate("userId")
                .populate("parlourId")
                .skip(skip)
                .limit(limit);
            // console.log('bookingdetials',bookingDetails)
            return { bookingDetails, totalPages };
        });
    }
    parlourDetails(parlourId) {
        return __awaiter(this, void 0, void 0, function* () {
            const parlourDetails = yield ParlourModel_1.ParlourModel.findById(parlourId, { seats: 1 });
            return parlourDetails;
        });
    }
    bookingsOnDate(parlourId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookingsOnDate = yield bookingModel_1.BookingModel.find({ date, parlourId });
            return bookingsOnDate;
        });
    }
    cancelBooking(bookingId, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = yield bookingModel_1.BookingModel.updateOne({ _id: bookingId }, {
                $set: { status: "cancelled", cancelReason: reason },
            }, {
                upsert: true,
            });
            const paymentId = yield bookingModel_1.BookingModel.findOne({ _id: bookingId }, { payment_intent: 1 });
            return { paymentId };
        });
    }
    //cancelled by parlour
    cancelledByParlour(bookingId, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield bookingModel_1.BookingModel.updateOne({ _id: bookingId }, {
                $set: { status: "cancelledByParlour", cancelReason: reason }
            }, { $upsert: true });
            const paymentId = yield bookingModel_1.BookingModel.findOne({ _id: bookingId }, { payment_intent: 1 });
            return { paymentId };
        });
    }
    //getting all bookings
    allBookings(parlourId, page) {
        return __awaiter(this, void 0, void 0, function* () {
            let limit = 4;
            let skip = (page - 1) * limit;
            const totalBookings = yield bookingModel_1.BookingModel.find({
                parlourId,
            }).countDocuments();
            const totalPages = Math.floor(totalBookings / limit);
            const bookingDetails = yield bookingModel_1.BookingModel.find({ parlourId })
                .populate("userId")
                .populate("parlourId")
                .sort({ date: -1 })
                .skip(skip)
                .limit(limit);
            return { bookingDetails, totalPages };
        });
    }
    bookedSlots(parlourId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const formattedDate = new Date(date);
            console.log("df", formattedDate, parlourId);
            // Find bookings for the specified parlour and date
            const data = yield bookingModel_1.BookingModel.aggregate([
                {
                    $match: {
                        date: formattedDate,
                        parlourId: new mongoose_1.Types.ObjectId(parlourId),
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
            const holiday = yield ParlourModel_1.ParlourModel.find({
                _id: parlourId,
                holidays: { $in: [formattedDate] }
            });
            console.log('holiday', holiday);
            // console.log("dkasfjadgkdf", data);
            return { data, holiday };
        });
    }
    getHolidays(parlourId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            // Convert the input date string to a Date object
            const [year, month, day] = date.split('-').map(Number);
            const dateObject = new Date(year, month - 1, day);
            // Format the date object to match the format in the MongoDB documents
            const formattedDate = dateObject.toISOString().split('T')[0];
            console.log('Formatted Date:', formattedDate);
            try {
                // Match documents where the formatted date is in the 'holidays' array
                const holidays = yield ParlourModel_1.ParlourModel.aggregate([
                    {
                        $match: {
                            _id: new mongoose_1.Types.ObjectId(parlourId),
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
            }
            catch (error) {
                console.error('Error fetching holidays:', error);
                throw error;
            }
        });
    }
}
exports.default = bookingRepository;
