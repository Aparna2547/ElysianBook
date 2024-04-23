"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user"
    },
    parlourId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'parlour'
    },
    startingTime: {
        type: String
    },
    endingTime: {
        type: String
    },
    totalDuration: {
        type: Number
    },
    date: {
        type: Date
    },
    totalPrice: {
        type: Number
    },
    services: {
        type: Object
    },
    status: {
        type: String,
        default: "confirmed"
    },
    seatNo: {
        type: Number
    },
    payment_intent: {
        type: String
    },
    cancelReason: {
        type: String
    },
    cancelledByParlour: {
        type: String
    }
});
const BookingModel = mongoose_1.default.model('bookings', bookingSchema);
exports.BookingModel = BookingModel;
