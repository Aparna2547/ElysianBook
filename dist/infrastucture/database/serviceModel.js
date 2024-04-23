"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const serviceSchema = new mongoose_1.default.Schema({
    vendorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'parlour'
    },
    serviceName: {
        type: String,
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'category'
    },
    duration: {
        type: Number,
    },
    isListed: {
        type: Boolean,
        default: true
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    image: {
        type: String
    }
});
const ServiceModel = mongoose_1.default.model('services', serviceSchema);
exports.ServiceModel = ServiceModel;
