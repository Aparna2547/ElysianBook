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
const adminModel_1 = require("../database/adminModel");
const userModel_1 = require("../database/userModel");
const ParlourModel_1 = require("../database/ParlourModel");
const bookingModel_1 = require("../database/bookingModel");
class adminRepository {
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("email check");
            const existingAdmin = yield adminModel_1.adminModel.findOne({ email });
            if (existingAdmin) {
                return existingAdmin;
            }
            else {
                return null;
            }
        });
    }
    //getting user
    getUser(search, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("alll users");
                // const showUser = await UserModel.find();
                const limit = 4;
                let skip = (page - 1) * limit;
                let totalUsers = yield userModel_1.UserModel.find({}).countDocuments();
                let totalPages = Math.floor(totalUsers / limit);
                const showUser = yield userModel_1.UserModel.find({
                    $or: [
                        { name: { $regex: '^' + search, $options: "i" } },
                        { email: { $regex: '^' + search, $options: "i" } }
                    ]
                }).skip(skip).limit(limit);
                console.log(showUser);
                return { showUser, totalPages };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //block user
    blockUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id);
            console.log("block user");
            const user = yield userModel_1.UserModel.findById(id);
            // user.isBlocked = !user?.isBlocked
            // await user.save()
            // console.log(user);
            // if (user) {
            //   let userStatus;
            //   if (user.isBlocked === false) {
            //     console.log("user is unblocked");
            //     userStatus = await UserModel.updateOne(
            //       { _id: id },
            //       { $set: { isBlocked: true } }
            //     );
            //   } else {
            //     userStatus = await UserModel.updateOne(
            //       { _id: id },
            //       { $set: { isBlocked: false } }
            //     );
            //   }
            //   return userStatus;
            // } else {
            //   return null;
            // }
            // return user
            if (user) {
                user.isBlocked = !user.isBlocked;
                yield user.save();
                console.log((user));
            }
        });
    }
    //list all vendors
    getParlours(search, page) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("all vendors-usecase");
            // const showVendors = await ParlourModel.find();
            const limit = 4;
            let skip = (page - 1) * limit;
            let totalParlours = yield ParlourModel_1.ParlourModel.find({}).countDocuments();
            let totalPages = Math.floor(totalParlours / limit);
            const showVendors = yield ParlourModel_1.ParlourModel.find({
                $or: [
                    { name: { $regex: '^' + search, $options: "i" } },
                    { email: { $regex: '^' + search, $options: "i" } }
                ]
            }).skip(skip).limit(limit);
            userModel_1.UserModel;
            console.log('parlours', showVendors);
            return { showVendors, totalPages };
        });
    }
    //block vendor
    blockVendor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("inside repo");
            const vendor = yield ParlourModel_1.ParlourModel.findById(id);
            // if (vendorDetails) {
            //   let vendorStatus;
            //   if (vendorDetails.isBlocked === false) {
            //     console.log("vendor is unblocked");
            //     vendorStatus = await ParlourModel.updateOne(
            //       { _id: id },
            //       { $set: { isBlocked: true } }
            //     );
            //   } else {
            //     vendorStatus = await ParlourModel.updateOne(
            //       { _id: id },
            //       { $set: { isBlocked: false } }
            //     );
            //   }
            //   return vendorStatus;
            // } else {
            //   return null;
            // }
            if (vendor) {
                vendor.isBlocked = !vendor.isBlocked;
                yield vendor.save();
                console.log(vendor);
            }
        });
    }
    getSingleParlourDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const parlourDetails = yield ParlourModel_1.ParlourModel.findOne({ _id: id });
            return parlourDetails;
        });
    }
    parlourRequest(id, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestParlour = yield ParlourModel_1.ParlourModel.updateOne({ _id: id }, { $set: { status: value } });
            return requestParlour;
        });
    }
    totalDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            const allUsers = yield userModel_1.UserModel.find({}).countDocuments();
            console.log('allusers', allUsers);
            const allParlours = yield ParlourModel_1.ParlourModel.find({}).countDocuments();
            console.log('asllparlour', allParlours);
            const parlour = yield ParlourModel_1.ParlourModel.find({ status: 'Active' }).countDocuments();
            console.log('active parlour', parlour);
            const regFee = parlour * 2000;
            const bookings = yield bookingModel_1.BookingModel.find().countDocuments();
            const bookFee = bookings * 50;
            console.log('active parlour', bookings, bookFee);
            const revenue = regFee + bookFee;
            console.log('revenue    ', revenue);
            return { allUsers, allParlours, revenue };
        });
    }
    monthlyData(year) {
        return __awaiter(this, void 0, void 0, function* () {
            const startDate = new Date(year, 0, 1);
            const endDate = new Date(year + 1, 0, 1);
            const activeParlours = yield ParlourModel_1.ParlourModel.find({ status: "Active", date: { $gte: startDate, $lt: endDate } }).countDocuments();
            const regFee = activeParlours * 2000;
            const bookings = yield bookingModel_1.BookingModel.find({ date: { $gte: startDate, $lt: endDate } }).countDocuments();
            console.log('Bookings:', bookings);
            const bookFee = bookings * 50;
            const revenue = regFee + bookFee;
            const profit = revenue - (activeParlours * 2000);
            console.log('Revenue:', revenue);
            console.log('Profit:', profit);
            const res = yield bookingModel_1.BookingModel.aggregate([
                {
                    $match: {
                        status: 'completed',
                        date: { $gte: startDate, $lt: endDate }
                    }
                }, {
                    $group: {
                        _id: {
                            month: { $month: "$date" },
                            year: { $year: "$date" }
                        },
                        totalPrice: { $sum: "$totalPrice" }
                    }
                }, {
                    $project: {
                        _id: 0,
                        month: "$_id.month",
                        year: "$_id.year",
                        totalPrice: 1
                    }
                },
                {
                    $sort: {
                        year: 1,
                        month: 1
                    }
                }
            ]);
            console.log('dfkd', res);
            return res;
        });
    }
}
exports.default = adminRepository;
