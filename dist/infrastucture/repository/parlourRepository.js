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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ParlourModel_1 = require("../database/ParlourModel");
const serviceModel_1 = require("../database/serviceModel");
const bookingModel_1 = require("../database/bookingModel");
const mongoose_1 = __importDefault(require("mongoose"));
class parlourRepository {
    saveParlour(parlour) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("inside ad db");
            const newParlour = new ParlourModel_1.ParlourModel(parlour);
            yield newParlour.save();
            return newParlour;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("email exist check");
            const existingParlour = yield ParlourModel_1.ParlourModel.findOne({ email });
            if (existingParlour) {
                return existingParlour;
            }
            else {
                return null;
            }
        });
    }
    findParlourById(parlour) {
        return __awaiter(this, void 0, void 0, function* () {
            const parlourFound = yield ParlourModel_1.ParlourModel.findById(parlour);
            console.log(parlourFound);
            return parlourFound;
        });
    }
    //change password
    changePassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const changePasswordStatus = yield ParlourModel_1.ParlourModel.updateOne({ email }, { $set: { password: password } });
            return changePasswordStatus;
        });
    }
    addParlour(parlourData, vendorId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("final step", parlourData);
            const parlourAdd = yield ParlourModel_1.ParlourModel.findByIdAndUpdate(vendorId, {
                $set: {
                    parlourName: parlourData.parlourName,
                    landmark: parlourData.landmark,
                    locality: parlourData.locality,
                    district: parlourData.district,
                    openingTime: parlourData.openingTime,
                    closingTime: parlourData.closingTime,
                    contact: parlourData.contact,
                    seats: parlourData.seats,
                    latitude: parlourData.latitude,
                    longitude: parlourData.longitude,
                    facilities: parlourData.facilities,
                    banners: parlourData.banners,
                    status: "Pending"
                },
            });
            console.log("Parlour details saved successfully");
            return parlourAdd;
            console.log("enthnna");
        });
    }
    editParlour(vendorId, parlourData) {
        return __awaiter(this, void 0, void 0, function* () {
            const parlourEdit = yield ParlourModel_1.ParlourModel.findByIdAndUpdate(vendorId, {
                $set: {
                    parlourName: parlourData.parlourName,
                    landmark: parlourData.landmark,
                    locality: parlourData.locality,
                    district: parlourData.district,
                    openingTime: parlourData.openingTime,
                    closingTime: parlourData.closingTime,
                    contact: parlourData.contact,
                    seats: parlourData.seats,
                    latitude: parlourData.latitude,
                    longitude: parlourData.longitude,
                    facilities: parlourData.facilities,
                    banners: parlourData.banners,
                    status: "Pending"
                },
            });
            console.log("Parlour details saved successfully");
            return parlourEdit;
        });
    }
    findVendorById(vendorId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('repo profile');
            const profileDetails = yield ParlourModel_1.ParlourModel.findOne({ _id: vendorId }, { name: 1, email: 1, parlourName: 1, status: 1, password: 1, vendorImage: 1 });
            // console.log(profileDetails);
            return profileDetails;
        });
    }
    editVendorName(vendorId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('ayuo');
            const nameChangeStatus = yield ParlourModel_1.ParlourModel.findByIdAndUpdate(vendorId, { $set: { name } });
            console.log(nameChangeStatus);
            return nameChangeStatus;
        });
    }
    editVendorPassword(vendorId, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const changePasswordStatus = yield ParlourModel_1.ParlourModel.findByIdAndUpdate(vendorId, { $set: { password: hashedPassword } });
            console.log('password changed');
            return changePasswordStatus;
        });
    }
    editVendor(vendor, vendorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const vendorEdit = yield ParlourModel_1.ParlourModel.findByIdAndUpdate(vendorId, vendor);
            return vendorEdit;
        });
    }
    dashboardDetails(parlourId) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectId = new mongoose_1.default.Types.ObjectId(parlourId);
            console.log(objectId);
            const allServices = yield serviceModel_1.ServiceModel.find({ vendorId: parlourId }).countDocuments();
            console.log(allServices, 'dknkdc');
            const allBookings = yield bookingModel_1.BookingModel.find({ parlourId }).countDocuments();
            console.log(allBookings);
            const cancelledBookings = yield bookingModel_1.BookingModel.find({ parlourId: parlourId, status: "cancelled" }).countDocuments();
            console.log('dfs', cancelledBookings);
            const revenue = yield bookingModel_1.BookingModel.aggregate([
                {
                    $match: {
                        parlourId: objectId,
                        status: 'completed'
                    }
                },
                {
                    $group: {
                        _id: '$parlourId',
                        totalPrice: { $sum: "$totalPrice" }
                    }
                },
                { $project: {
                        _id: 0,
                        totalPrice: 1
                    }
                }
            ]);
            const totalRevenue = revenue.length > 0 ? revenue[0].totalPrice : 0;
            console.log('revenye', totalRevenue);
            const profit = Math.floor(totalRevenue * (20 / 100));
            console.log(profit);
            return { allServices, allBookings, totalRevenue, cancelledBookings, profit };
        });
    }
    getMonthlyCompletedBooking(parlourId, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const startDate = new Date(year, 0, 1);
            const endDate = new Date(year + 1, 0, 1);
            const objectId = new mongoose_1.default.Types.ObjectId(parlourId);
            console.log(startDate, endDate);
            const result = yield bookingModel_1.BookingModel.aggregate([
                {
                    $match: {
                        parlourId: objectId,
                        status: 'completed',
                        date: { $gte: startDate, $lt: endDate }
                    }
                },
                {
                    $group: {
                        _id: {
                            month: { $month: "$date" },
                            year: { $year: "$date" }
                        },
                        totalPrice: { $sum: "$totalPrice" }
                    }
                },
                {
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
            console.log('result', result);
            const bookingData = yield bookingModel_1.BookingModel.aggregate([
                {
                    $match: {
                        parlourId: objectId,
                        status: { $in: ['completed', 'cancelled'] },
                        date: { $gte: startDate, $lt: endDate }
                    }
                },
                {
                    $group: {
                        _id: '$status',
                        count: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        status: '$_id',
                        count: 1
                    }
                }
            ]);
            console.log('bookindata', bookingData);
            // return {result,bookingData} 
            return result;
        });
    }
    addHolidays(parlourId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('rpo', date);
            const addHoliday = yield ParlourModel_1.ParlourModel.updateOne({ _id: parlourId }, {
                $push: { holidays: date } // Using the Date object directly
            });
            console.log('sada', addHoliday);
        });
    }
}
exports.default = parlourRepository;
