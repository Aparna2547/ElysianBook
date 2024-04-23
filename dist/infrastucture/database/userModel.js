"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// interface User extends Document{
//     name:String,
//     email:String,
//     password:String
//     isBlocked:Boolean
// }
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    image: {
        type: String
    }
});
const UserModel = mongoose_1.default.model('user', userSchema);
exports.UserModel = UserModel;
