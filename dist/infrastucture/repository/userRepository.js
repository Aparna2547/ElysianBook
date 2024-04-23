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
const userModel_1 = require("../database/userModel");
const ParlourModel_1 = require("../database/ParlourModel");
const CategoryModel_1 = require("../database/CategoryModel");
class userRepository {
    saveUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new userModel_1.UserModel(user);
            yield newUser.save();
            return newUser;
        });
    }
    //for middleware
    findUserById(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFound = yield userModel_1.UserModel.findById(user);
            return userFound;
        });
    }
    // //checking email is in databse
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('email',email);
            console.log('email exist check');
            const existingUser = yield userModel_1.UserModel.findOne({ email: email });
            // console.log(existingUser,'asdjk');
            if (existingUser) {
                return existingUser;
            }
            else {
                return null;
            }
        });
    }
    //change password
    changePassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const changePasswordStatus = yield userModel_1.UserModel.updateOne({ email }, { $set: { password: password } });
            console.log(changePasswordStatus, 'kjhkhkjkjh');
            return changePasswordStatus;
        });
    }
    getParloursToShow(page, location) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('loc', location);
            let limit = 6;
            let skip = (page - 1) * limit;
            const totalParlours = yield ParlourModel_1.ParlourModel.find({ status: { $eq: "Active" },
                locality: { $regex: '^' + location, $options: "i" } }).countDocuments();
            const totalPages = Math.floor(totalParlours / limit);
            const parlours = yield ParlourModel_1.ParlourModel.find({ status: { $eq: "Active" },
                locality: { $regex: '^' + location, $options: "i" } }).skip(skip).limit(limit);
            console.log('loo', parlours);
            return { parlours, totalPages };
        });
    }
    getSingleParlourDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parlourDetails = yield ParlourModel_1.ParlourModel.findOne({ _id: id });
                console.log(parlourDetails);
                return parlourDetails;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield CategoryModel_1.CategoryModel.find({}, { hide: false });
            console.log(data);
            return data;
        });
    }
    findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const profileDetails = yield userModel_1.UserModel.findById(userId);
            return profileDetails;
        });
    }
    editUser(userId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userEdit = yield userModel_1.UserModel.findByIdAndUpdate(userId, user);
            console.log('edited');
            return userEdit;
        });
    }
    deleteProfilePicture(userId, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteImage = yield userModel_1.UserModel.updateOne({ _id: userId }, { $set: { image: '' } });
            return deleteImage;
        });
    }
    saveProfileImage(userId, imageLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageChange = yield userModel_1.UserModel.findOne({ _id: userId }, { $set: { image: imageLink } });
            return imageChange;
        });
    }
}
exports.default = userRepository;
