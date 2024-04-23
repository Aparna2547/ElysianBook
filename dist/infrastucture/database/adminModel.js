"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// interface Admin extends Document{
//     email:String,
//     password:String,
// }
const adminSchema = new mongoose_1.default.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }
});
const adminModel = mongoose_1.default.model('admin', adminSchema);
exports.adminModel = adminModel;
