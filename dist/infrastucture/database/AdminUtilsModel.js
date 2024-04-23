"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUtilsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// interface AdminUtils extends Document{
//   facilities : Array<string> | null;
// }
const adminUtils = new mongoose_1.default.Schema({
    facilities: {
        type: Array
    },
    banners: {
        type: Array
    }
});
const AdminUtilsModel = mongoose_1.default.model("facilities", adminUtils);
exports.AdminUtilsModel = AdminUtilsModel;
