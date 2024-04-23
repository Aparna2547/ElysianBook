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
const AdminUtilsModel_1 = require("../database/AdminUtilsModel");
class AdminutilsRepository {
    addFacility(facility) {
        return __awaiter(this, void 0, void 0, function* () {
            const newFacility = yield AdminUtilsModel_1.AdminUtilsModel.updateOne({}, { $addToSet: { facilities: facility } }, { upsert: true });
            console.log(newFacility);
            return newFacility;
        });
    }
    allFacilities() {
        return __awaiter(this, void 0, void 0, function* () {
            const facilities = yield AdminUtilsModel_1.AdminUtilsModel.find({}, { facilities: 1 });
            return facilities;
        });
    }
    addBanner(imageLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const bannerAdd = yield AdminUtilsModel_1.AdminUtilsModel.updateOne({}, { $push: { banners: { $each: imageLink } } }, { new: true });
            console.log('completed', bannerAdd);
            return bannerAdd;
        });
    }
    getBanners() {
        return __awaiter(this, void 0, void 0, function* () {
            const banners = yield AdminUtilsModel_1.AdminUtilsModel.find({}, { banners: 1 });
            return banners;
        });
    }
    deleteBanner(banner) {
        return __awaiter(this, void 0, void 0, function* () {
            const bannerDelete = yield AdminUtilsModel_1.AdminUtilsModel.updateOne({}, {
                $pull: { banners: banner }
            });
            console.log('deleted');
            return bannerDelete;
        });
    }
}
exports.default = AdminutilsRepository;
