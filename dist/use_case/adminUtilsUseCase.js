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
class Adminutilsusecase {
    constructor(adminutilsRepository, cloudinary) {
        this.adminutilsRepository = adminutilsRepository;
        this.cloudinary = cloudinary;
    }
    addFacility(facility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('inside usecase');
                const facilityStatus = yield this.adminutilsRepository.addFacility(facility);
                console.log(facilityStatus);
                return {
                    status: 200,
                    data: facilityStatus
                };
            }
            catch (error) {
                console.log(error);
                throw new Error("Failed to add facility"); // Throw error to be caught by callers
            }
        });
    }
    allFacilities() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log('inside facilities')
                const facilities = yield this.adminutilsRepository.allFacilities();
                // console.log(facilities);
                return {
                    status: 200,
                    data: facilities
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addBanner(image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uploadBanners = yield Promise.all(image.map((file) => __awaiter(this, void 0, void 0, function* () {
                    return yield this.cloudinary.saveToCloudinary(file);
                })));
                console.log('up', uploadBanners);
                // const imageLink = await this.cloudinary.saveToCloudinary(image)
                // console.log(imageLink);
                const saveBanner = yield this.adminutilsRepository.addBanner(uploadBanners);
                return {
                    status: 200,
                    data: saveBanner
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getBanners() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const banners = yield this.adminutilsRepository.getBanners();
                return {
                    status: 200,
                    data: banners
                };
            }
            catch (error) {
            }
        });
    }
    deleteBanner(banner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteBanner = yield this.adminutilsRepository.deleteBanner(banner);
                return {
                    status: 200,
                    data: deleteBanner
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = Adminutilsusecase;
