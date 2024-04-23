"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// interface Category extends Document{
//     catName:String,
//     image:String,
//     hide:Boolean
// }
const categorySchema = new mongoose_1.default.Schema({
    catName: {
        type: String
    },
    image: {
        type: String
    },
    hide: {
        type: Boolean,
        default: false
    }
});
const CategoryModel = mongoose_1.default.model('category', categorySchema);
exports.CategoryModel = CategoryModel;
