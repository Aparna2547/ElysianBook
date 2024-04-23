"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParlourModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const parlourSchema = new mongoose_1.default.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    vendorImage: {
        type: String
    },
    parlourName: {
        type: String
    },
    landmark: {
        type: String
    },
    locality: {
        type: String
    },
    district: {
        type: String
    },
    openingTime: {
        type: String
    },
    closingTime: {
        type: String
    },
    contact: {
        type: Number
    },
    seats: {
        type: Number
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number
    },
    facilities: {
        type: [String],
        default: []
    },
    banners: {
        type: [String]
    },
    status: {
        type: String,
        default: "Registered"
    },
    holidays: {
        type: [Date],
        default: []
    }
});
const ParlourModel = mongoose_1.default.model('parlour', parlourSchema);
exports.ParlourModel = ParlourModel;
