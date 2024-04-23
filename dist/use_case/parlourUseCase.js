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
class ParlourUseCase {
    constructor(parlourRepository, otpGen, sendOtp, Encrypt, JWTtokens, Cloudinary) {
        this.parlourRepository = parlourRepository;
        this.sendOtp = sendOtp;
        this.otpGen = otpGen;
        this.Encrypt = Encrypt;
        this.JWTtokens = JWTtokens;
        this.Cloudinary = Cloudinary;
    }
    findVendor(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('inside parlor usecase');
            const vendorFound = yield this.parlourRepository.findByEmail(email);
            if (vendorFound) {
                console.log('vendorfound');
                return {
                    status: 200,
                    data: {
                        data: true
                    }
                };
            }
            else {
                const otp = yield this.otpGen.genOtp(4);
                console.log('otp', otp);
                const mailDetails = yield this.sendOtp.sendMail(name, email, otp);
                console.log('vendor maildetails');
                return {
                    status: 200,
                    data: {
                        data: false,
                        otp: otp
                    }
                };
            }
        });
    }
    saveVendor(vendor) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield this.Encrypt.createHash(vendor.password);
                vendor.password = hashedPassword;
                const vendorSave = yield this.parlourRepository.saveParlour(vendor);
                return {
                    status: 200,
                    data: vendorSave
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //gsignup
    gparlourSignup(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parlourFound = yield this.parlourRepository.findByEmail(email);
                if (parlourFound) {
                    return {
                        status: 200,
                        data: false
                    };
                }
                else {
                    const hashedpassword = yield this.Encrypt.createHash(password);
                    const parlourSave = yield this.parlourRepository.saveParlour({ name, email, password: hashedpassword });
                    return {
                        status: 200,
                        data: parlourSave
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //login
    parlourLogin(vendor) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('parlour usecase');
                const vendorFound = yield this.parlourRepository.findByEmail(vendor.email);
                console.log(vendorFound);
                if (vendorFound) {
                    if (vendorFound.isBlocked) {
                        return {
                            status: 200,
                            data: {
                                success: false,
                                message: "you are blocked"
                            }
                        };
                    }
                    const passwordMatch = yield this.Encrypt.compare(vendor.password, vendorFound.password);
                    if (passwordMatch) {
                        const token = this.JWTtokens.createJwt(vendorFound._id, 'vendor');
                        return {
                            status: 200,
                            data: {
                                success: true,
                                messsage: 'authentication success',
                                vendorId: vendorFound._id,
                                token: token
                            }
                        };
                    }
                    else {
                        return {
                            status: 200,
                            data: {
                                success: false,
                                message: 'invalid credentials'
                            }
                        };
                    }
                }
                else {
                    return {
                        status: 200,
                        data: {
                            success: false,
                            message: 'invalid credentials'
                        }
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //forgot password
    findVendorByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('inside parlourcase');
            const parlourFound = yield this.parlourRepository.findByEmail(email);
            console.log('parlouefoound', parlourFound);
            if (parlourFound) {
                const otp = yield this.otpGen.genOtp(4);
                console.log(otp, 'otp');
                const mailDetails = yield this.sendOtp.forgotSendMail(email, otp);
                console.log('vendor found');
                return {
                    status: 200,
                    data: {
                        data: false,
                        otp: otp
                    }
                };
            }
            else {
                return {
                    status: 200,
                    data: {
                        data: true
                    }
                };
            }
        });
    }
    //change password
    vendorPasswordChange(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const parlourFound = yield this.parlourRepository.findByEmail(email);
            if (parlourFound) {
                console.log('eefkhkhadm');
                const hashedPassword = yield this.Encrypt.createHash(password);
                console.log(hashedPassword);
                const savePasswordStatus = yield this.parlourRepository.changePassword(email, hashedPassword);
                return savePasswordStatus;
            }
        });
    }
    //adding parlour
    addParlourDetails(parlourData, vendorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const parlourDetails = yield this.parlourRepository.findParlourById(vendorId);
            const uploadBanners = yield Promise.all(parlourData.banners.map((file) => __awaiter(this, void 0, void 0, function* () {
                return yield this.Cloudinary.saveToCloudinary(file);
            })));
            parlourData.banners = uploadBanners;
            parlourData._id = vendorId;
            console.log('helloo', parlourData);
            const parlourStatus = yield this.parlourRepository.addParlour(parlourData, vendorId);
            return parlourStatus;
        });
    }
    editParlour(vendorId, parlourData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uploadBanners = yield Promise.all(parlourData.banners.map((file) => __awaiter(this, void 0, void 0, function* () {
                    return yield this.Cloudinary.saveToCloudinary(file);
                })));
                parlourData.banners = uploadBanners;
                parlourData._id = vendorId;
                console.log('helloo', parlourData);
                const parlourStatus = yield this.parlourRepository.editParlour(vendorId, parlourData);
                return parlourStatus;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    findParlourById(vendorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parlourFound = yield this.parlourRepository.findParlourById(vendorId);
                return {
                    status: 200,
                    data: parlourFound
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    vendorProfile(vendorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorFound = yield this.parlourRepository.findVendorById(vendorId);
                return {
                    status: 200,
                    data: vendorFound
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editVendorName(vendorId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('inside editVendorName usecase');
                const changeName = yield this.parlourRepository.editVendorName(vendorId, name);
                return {
                    status: 200,
                    data: changeName
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editVendorPassword(vendorId, currentPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('usecase');
                const vendorFound = yield this.parlourRepository.findVendorById(vendorId);
                // const hashcurrentpassword = await this.Encrypt.createHash(currentPassword)
                const passwordMatch = yield this.Encrypt.compare(currentPassword, vendorFound.password);
                if (passwordMatch) {
                    const hashedPassword = yield this.Encrypt.createHash(newPassword);
                    const changePassword = yield this.parlourRepository.editVendorPassword(vendorId, hashedPassword);
                    return {
                        status: 200,
                        data: changePassword
                    };
                }
                else {
                    console.log('password current worng');
                    return {
                        status: 200,
                        data: {
                            success: false
                        }
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editVendorEmail(vendorId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('parlourcase email');
                const vendorFound = yield this.parlourRepository.findVendorById(vendorId);
                if (vendorFound) {
                    const otp = yield this.otpGen.genOtp(4);
                    console.log(otp);
                    const mailDetails = yield this.sendOtp.forgotSendMail(email, otp);
                    return {
                        status: 200,
                        data: {
                            data: false,
                            otp: otp
                        }
                    };
                }
                else {
                    return {
                        status: 200,
                        data: {
                            data: true
                        }
                    };
                }
            }
            catch (error) {
                console.log(error);
                return { status: 500, error: 'Internal Server Error' }; // Return an error object
            }
        });
    }
    editVendorEmailSave(vendorId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let vendorFound = yield this.parlourRepository.findVendorById(vendorId);
                vendorFound.email = email;
                const emailEdit = yield this.parlourRepository.editVendor(vendorFound, vendorId);
                return {
                    status: 200,
                    data: emailEdit
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    dashboardDetails(parlourId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let dashboardDetails = yield this.parlourRepository.dashboardDetails(parlourId);
                return {
                    status: 200,
                    data: dashboardDetails
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getMonthlyCompletedBooking(parlourId, year) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.parlourRepository.getMonthlyCompletedBooking(parlourId, year);
                return {
                    status: 200,
                    data: res
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addHolidays(parlourId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('usexase', date);
                const addHoliday = yield this.parlourRepository.addHolidays(parlourId, date);
                return addHoliday;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = ParlourUseCase;
