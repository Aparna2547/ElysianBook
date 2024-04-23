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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class parlourController {
    constructor(parlourcase) {
        this.parlourcase = parlourcase;
    }
    //email verifying
    verifyEmail(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log('controller');
            try {
                const { email, password, name } = req.body;
                const vendorData = yield this.parlourcase.findVendor(name, email, password);
                console.log('hh', vendorData);
                if (!vendorData.data.data) {
                    req.app.locals.vendor = { email, name, password };
                    req.app.locals.otp = (_a = vendorData === null || vendorData === void 0 ? void 0 : vendorData.data) === null || _a === void 0 ? void 0 : _a.otp;
                    console.log('kdfhoiafhoah', req.app.locals);
                    res.status(200).json(vendorData === null || vendorData === void 0 ? void 0 : vendorData.data);
                }
                else {
                    res.status(200).json({ data: true });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //verfiying otp
    verifyOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('thenga');
                const otpBody = req.body.otp;
                const otpSaved = req.app.locals.otp;
                console.log("optsa", otpBody, otpSaved);
                if (otpBody === otpSaved) {
                    const vendor = req.app.locals.vendor;
                    console.log(vendor);
                    const save = yield this.parlourcase.saveVendor(vendor);
                    if (save) {
                        console.log('sadfas');
                        return res.status(save.status).json(save);
                    }
                    else {
                        return res.status(200).json({ message: "invalid otp" });
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //google isgnup
    gsignup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('controller gsignup');
                const { email, name, password } = req.body;
                console.log(email, password);
                const parlour = yield this.parlourcase.gparlourSignup(name, email, password);
                console.log(parlour);
                res.status(200).json(parlour);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //vendor login
    vendorLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('vendor controller');
                const vendor = yield this.parlourcase.parlourLogin(req.body);
                if (vendor && vendor.data && typeof vendor.data === 'object' && 'token' in vendor.data) {
                    res.cookie('vendorJWT', vendor.data.token, {
                        httpOnly: true,
                        secure: process.env.Node_ENV !== 'development',
                        sameSite: 'none',
                        maxAge: 30 * 24 * 60 * 60 * 1000,
                    });
                }
                res.status(vendor.status).json(vendor.data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    vendorForgotPassword(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const vendorData = yield this.parlourcase.findVendorByEmail(email);
                console.log(vendorData);
                if (!vendorData.data.data) {
                    req.app.locals.email = email;
                    req.app.locals.otp = (_a = vendorData === null || vendorData === void 0 ? void 0 : vendorData.data) === null || _a === void 0 ? void 0 : _a.otp;
                    console.log(req.app.locals.otp);
                    res.status(201).json({ data: true });
                }
                else {
                    res.status(200).json({ data: false });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    vendorVerifyOtpForgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otpBody = req.body.otp;
                const otpLocals = req.app.locals.otp;
                if (otpBody == otpLocals) {
                    res.status(200).json(true);
                }
                else {
                    res.status(200).json(false);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    vendorPasswordChange(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.app.locals.email;
                const password = req.body.password;
                const Data = yield this.parlourcase.vendorPasswordChange(email, password);
                res.status(200).json(Data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //parlour adding (request sent to admin)
    addParlour(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log('helloooo')
                const token = req.cookies.vendorJWT;
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                const vendorId = decoded.id;
                console.log('parlour adding in controller');
                const parlourDetails = req.body;
                const banners = req.files;
                console.log(typeof (parlourDetails));
                parlourDetails.banners = banners;
                // console.log(parlourDetails,image);
                const addParlourDetails = yield this.parlourcase.addParlourDetails(parlourDetails, vendorId);
                res.status(200).json(addParlourDetails);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //edit parlour
    editParlour(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.cookies.vendorJWT;
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                const vendorId = decoded.id;
                console.log('njn vannee', vendorId);
                const parlourDetails = req.body;
                const banners = req.files;
                parlourDetails.banners = banners;
                console.log('type', typeof (parlourDetails));
                const editParlourStatus = yield this.parlourcase.editParlour(vendorId, parlourDetails);
                res.status(200).json(editParlourStatus);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getParlour(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.cookies.vendorJWT;
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                const vendorId = decoded.id;
                const parlourDetails = yield this.parlourcase.findParlourById(vendorId);
                res.status(200).json(parlourDetails);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    vendorProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('profile vendorcontroler');
                let vendorId;
                const token = req.cookies.vendorJWT;
                console.log(token);
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    vendorId = decoded.id;
                }
                console.log(vendorId, 'vendorid');
                const profileStatus = yield this.parlourcase.vendorProfile(vendorId);
                res.status(200).json(profileStatus);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editVendorName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('edit venor controller');
                let vendorId;
                const token = req.cookies.vendorJWT;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    vendorId = decoded.id;
                }
                console.log(vendorId, 'vendorid');
                const name = req.body.name;
                console.log(name);
                const nameStatus = yield this.parlourcase.editVendorName(vendorId, name);
                res.status(200).json(nameStatus);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editVendorPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let vendorId;
                const token = req.cookies.vendorJWT;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    vendorId = decoded.id;
                }
                console.log(vendorId, 'vendorid');
                const { currentPassword, newPassword } = req.body;
                console.log(currentPassword, newPassword);
                const changePassword = yield this.parlourcase.editVendorPassword(vendorId, currentPassword, newPassword);
                res.cookie('vendorJWT', '', {
                    httpOnly: true,
                    expires: new Date(0)
                });
                // res.status(200).json({success:true})
                res.status(200).json(changePassword);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editVendorEmail(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let vendorId;
                const token = req.cookies.vendorJWT;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    vendorId = decoded.id;
                }
                const email = req.body.email;
                console.log('controller,', email);
                const vendorData = yield this.parlourcase.editVendorEmail(vendorId, email);
                if (vendorData && vendorData.data && !vendorData.data.data) {
                    req.app.locals.vendor = email;
                    req.app.locals.vendorId = vendorId;
                    req.app.locals.otp = (_a = vendorData === null || vendorData === void 0 ? void 0 : vendorData.data) === null || _a === void 0 ? void 0 : _a.otp;
                    res.status(200).json(vendorData === null || vendorData === void 0 ? void 0 : vendorData.data);
                }
                else {
                    res.status(200).json({ data: true });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editVendorEmailOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otpBody = req.body.otp;
                console.log(otpBody);
                const otpSaved = req.app.locals.otp;
                console.log("optsa", otpBody, otpSaved);
                if (otpBody === otpSaved) {
                    // let vendorId;
                    // const token = req.cookies.vendorJWT
                    // if(token){
                    //     const decoded = jwt.verify(token,process.env.JWT_KEY as string) as JwtPayload;
                    //     vendorId = decoded.id;
                    // } 
                    const email = req.app.locals.vendor;
                    const vendorId = req.app.locals.vendorId;
                    console.log(email, vendorId);
                    const editEmail = yield this.parlourcase.editVendorEmailSave(vendorId, email);
                    return res.status(200).json(editEmail);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //dashboard details
    dashboardDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let parlourId;
                const token = req.cookies.vendorJWT;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    parlourId = decoded.id;
                }
                console.log(parlourId);
                const dashboardDetails = yield this.parlourcase.dashboardDetails(parlourId);
                res.status(200).json(dashboardDetails);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json("Fetching error");
            }
        });
    }
    //for charts
    getMonthlyCompletedBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let parlourId;
                const token = req.cookies.vendorJWT;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    parlourId = decoded.id;
                }
                const year = parseInt(req.query.year);
                const result = yield this.parlourcase.getMonthlyCompletedBooking(parlourId, year);
                res.status(200).json(result);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // async revenueAndRefund(req:Request,res:Response){
    //     try {
    //         let parlourId ;
    //         const token = req.cookies.vendorJWT
    //         if(token){
    //             const decoded = jwt.verify(token,process.env.JWT_KEY as string) as JwtPayload
    //             parlourId = decoded.id
    //         }
    //         const year = parseInt(req.query.year as string)
    //         const result = await this.parlourcase.revenueAndRefund(parlo)
    //         res.status(200).json(result)
    //     } catch (error) {
    //         res.status(500).json('internal server error')
    //     }
    // }
    addHolidays(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let parlourId;
                const token = req.cookies.vendorJWT;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    parlourId = decoded.id;
                }
                const date = req.query.date;
                console.log(date);
                const convertedDate = new Date(date);
                convertedDate.setDate(convertedDate.getDate());
                convertedDate.setUTCHours(0, 0, 0, 0);
                console.log('converteddate', convertedDate.toISOString());
                if (!parlourId || !date) {
                    return res.status(400).json({ message: 'Invalid parlourId or dates' });
                }
                const holidays = yield this.parlourcase.addHolidays(parlourId, convertedDate);
                res.status(200).json(holidays);
            }
            catch (error) {
                res.status(500).json('internal server error');
            }
        });
    }
    vendorLogout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.cookie('vendorJWT', '', {
                    httpOnly: true,
                    expires: new Date(0)
                });
                res.status(200).json({ success: true });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = parlourController;
