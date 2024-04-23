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
class AdminUtilsController {
    constructor(adminUtilsCase) {
        this.adminUtilsCase = adminUtilsCase;
    }
    addFacility(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('inside addfacility');
                const facility = req.body.facility;
                console.log(facility);
                const facilityStatus = yield this.adminUtilsCase.addFacility(facility);
                res.status(200).json(facilityStatus);
            }
            catch (error) {
                console.log(error);
                res.status(500).send("Internal Server Error");
            }
        });
    }
    getFacilites(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log('inside facilities')
                const allFacilities = yield this.adminUtilsCase.allFacilities();
                res.status(200).json(allFacilities === null || allFacilities === void 0 ? void 0 : allFacilities.data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addBanner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('hello', req.files);
                const image = req.files;
                const addBanner = this.adminUtilsCase.addBanner(image);
                res.status(200).json(addBanner);
            }
            catch (error) {
                res.status(500).json('internal servererror');
            }
        });
    }
    getBanners(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const banners = yield this.adminUtilsCase.getBanners();
                res.status(200).json(banners);
            }
            catch (error) {
                res.status(500).json('internal server error');
            }
        });
    }
    deleteBanner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('hi', req.query.banner);
                const banner = req.query.banner;
                const bannerDelete = yield this.adminUtilsCase.deleteBanner(banner);
                res.status(200).json(bannerDelete);
            }
            catch (error) {
                console.log(error);
                res.status(500).json('internal server eror');
            }
        });
    }
}
exports.default = AdminUtilsController;
