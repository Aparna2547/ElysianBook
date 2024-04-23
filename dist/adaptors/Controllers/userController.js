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
class userController {
    constructor(usercase) {
        this.usercase = usercase;
    }
    // async verifyEmail(req: Request, res: Response) {
    //     try {
    //         const { email, password, name } = req.body;
    //         const userData:any = await this.usercase.findUser(name, email, password);
    //         console.log(userData);
    //         if (!userData.data.data) {                    
    //             // req.app.locals.user = {email,name,password};
    //             // req.app.locals.otp = userData?.data?.otp;
    //             // console.log(req.app.locals);
    //             const otp = userData.data.otp;
    //             const jwtKey = process.env.JWT_KEY
    //             const user = req.body
    //             const payload = {user, otp};
    //             let token;
    //             if (jwtKey) {
    //                  token = jwt.sign(payload, jwtKey);
    //             } else {
    //                 // Handle the case where jwtKey is undefined
    //                 console.error("JWT key is undefined");
    //             }
    //             console.log('jwt',jwt,email,name,otp)
    //             // res.status(200).json(userData?.data);
    //             res.status(200).json({token});
    //         } else {
    //             res.status(409).json({ data: true });
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ message: "Internal Server Error" });
    //     }
    // }
    // async verifyOtp(req: Request, res: Response) {
    //     console.log('heloo')
    // try {
    //     const token = req.headers.authorization?.split(' ')[1];
    //     console.log(token);
    // if (!token) {
    //     return res.status(401).json({ message: "Unauthorized" });
    // }
    // const jwtKey = process.env.JWT_KEY;
    // if (!jwtKey) {
    //     return res.status(500).json({ message: "JWT key is not defined" });
    // }
    // // Verify the JWT token
    // const decoded = jwt.verify(token, jwtKey);
    //     const { email, otp } = decoded as { email: string; otp: string };
    //     console.log(email,otp)
    //         // const otpBody: string = req.body.otp;
    //         // const otpSaved: string = req.app.locals.otp;
    //         // console.log('jkjk',otpBody,otpSaved)
    //           // Verify the JWT token
    //             //  let jwtKey = process.env.JWT_KEY
    //             // const decoded = jwt.verify(token, jwtKey);
    //             // Extract email and OTP from decoded token
    //         //     const { email, otp } = decoded as { email: string; otp: string };
    //         // if (req.body.otp === otp) {
    //             // const user = req.app.locals.user;
    //             // const save = await this.usercase.saveUser(user);
    //             // if (save) {
    //             //     console.log('save',save);
    //             //     return res.status(save.status).json(save);
    //             // } else {
    //             //     return res.status(400).json({ message: "Invalid otp" });
    //             // }
    //         // }
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ message: "Internal Server Error" });
    //     }
    // }
    //verify email
    verifyEmail(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, name } = req.body;
                const userData = yield this.usercase.findUser(name, email, password);
                console.log(userData);
                if (!userData.data.data) {
                    req.app.locals.user = { email, name, password };
                    req.app.locals.otp = (_a = userData === null || userData === void 0 ? void 0 : userData.data) === null || _a === void 0 ? void 0 : _a.otp;
                    console.log('dfhfs', req.app.locals.user);
                    res.status(200).json(userData === null || userData === void 0 ? void 0 : userData.data);
                }
                else {
                    res.status(409).json({ data: true });
                }
            }
            catch (error) {
                console.log(error);
                res.status(501).json({ message: "Internal Server Error" });
            }
        });
    }
    //verify otp
    verifyOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otpBody = req.body.otp;
                const otpSaved = req.app.locals.otp;
                console.log('jkjk', otpBody, otpSaved);
                if (otpBody === otpSaved) {
                    const user = req.app.locals.user;
                    const save = yield this.usercase.saveUser(user);
                    if (save) {
                        console.log('save', save);
                        return res.status(save.status).json(save);
                    }
                }
                else {
                    return res.status(200).json({ message: "Invalid otp" });
                }
            }
            catch (error) {
                console.log(error);
                res.status(501).json({ message: "Internal Server Error" });
            }
        });
    }
    //    //resend otp
    resendOtp(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('resend otp');
                const { email, name, password } = req.app.locals.user;
                const userData = yield this.usercase.findUser(name, email, password);
                console.log(userData);
                let otpSaved = (_a = userData === null || userData === void 0 ? void 0 : userData.data) === null || _a === void 0 ? void 0 : _a.otp;
                req.app.locals.otp = otpSaved;
                console.log(req.app.locals);
                res.status(200).json(true);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    gsignup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('controller gsignup');
                const { email, name, password } = req.body;
                const user = yield this.usercase.gSignupUser(name, email, password);
                console.log(user);
                res.status(200).json(user);
            }
            catch (error) {
                console.log(error);
                res.status(501).json({ message: "Internal Server Error" });
            }
        });
    }
    logIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('userController');
                // const user = req.body
                const user = yield this.usercase.logIn(req.body);
                console.log('kjhk', user);
                // Check if user is defined before accessing its properties
                if (user && user.data && typeof user.data === 'object' && 'accessToken' in user.data && 'refreshToken' in user.data) {
                    console.log('usi', user);
                    res.cookie('RefreshToken', user.data.refreshToken, {
                        httpOnly: true,
                        secure: process.env.Node_ENV !== 'development',
                        sameSite: 'none',
                        maxAge: 30 * 24 * 60 * 60 * 1000,
                    });
                    res.cookie('userJWT', user.data.accessToken, {
                        httpOnly: true,
                        secure: process.env.Node_ENV !== 'development',
                        sameSite: 'none',
                        maxAge: 30 * 24 * 60 * 60 * 1000,
                    });
                }
                res.status(user.status).json(user.data); // Use non-null assertion operator
            }
            catch (error) {
                console.log(error);
                res.status(501).json({ message: "Internal Server Error" });
            }
        });
    }
    //forgot password
    forgotPasswordEmail(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('inside forgot controller');
                const email = req.body.email;
                // console.log(email,'email in controller')
                const userData = yield this.usercase.findUserByMail(email);
                console.log('userdata', userData.data);
                if (!userData.data.data) {
                    req.app.locals.email = email;
                    req.app.locals.otp = (_a = userData === null || userData === void 0 ? void 0 : userData.data) === null || _a === void 0 ? void 0 : _a.otp;
                    console.log('njn', req.app.locals.otp);
                    res.status(201).json({ data: true });
                }
                else {
                    res.status(200).json({ data: false });
                }
            }
            catch (error) {
                console.log(error);
                res.status(501).json({ message: "Internal Server Error" });
            }
        });
    }
    // verifyotp for forgotpassword
    verifyOtpForgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otpBody = req.body.otp;
                const otpLocals = req.app.locals.otp;
                if (otpBody === otpLocals) {
                    res.status(200).json(true);
                }
                else {
                    res.status(200).json(false);
                }
            }
            catch (error) {
                console.log(error);
                res.status(501).json({ message: "Internal Server Error" });
            }
        });
    }
    passwordChange(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.app.locals.email;
                const password = req.body.password;
                const Data = yield this.usercase.passwordChange(email, password);
                res.status(200).json(Data);
            }
            catch (error) {
                console.log(error);
                res.status(501).json({ message: "Internal Server Error" });
            }
        });
    }
    //show all parlour
    parloursToShow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log('get all parlours')
                const page = parseInt(req.query.page);
                const location = req.query.location !== 'null' ? req.query.location : '';
                console.log('dfdf', location);
                const parlours = yield this.usercase.parloursToShow(page, location);
                res.status(200).json(parlours);
            }
            catch (error) {
                console.log(error);
                res.status(501).json({ message: "Internal Server Error" });
            }
        });
    }
    singleParlourDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                // console.log('afa',id)
                const singleParlourStatus = yield this.usercase.singleParlourDetails(id);
                res.status(200).json(singleParlourStatus);
            }
            catch (error) {
                console.log(error);
                res.status(501).json({ message: "Internal Server Error" });
            }
        });
    }
    getAllCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.usercase.getAllCategories();
                res.status(200).json(data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    userProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userId;
                const token = req.cookies.userJWT;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    userId = decoded.id;
                }
                console.log(userId);
                const profileStatus = yield this.usercase.userProfile(userId);
                res.status(200).json(profileStatus);
            }
            catch (error) {
                console.log(error);
                res.status(501).json({ message: "Internal Server Error" });
            }
        });
    }
    changeUserName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('cont');
                let userId;
                const token = req.cookies.userJWT;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    userId = decoded.id;
                }
                const name = req.body.name;
                console.log(name);
                const changeName = yield this.usercase.changeUserName(userId, name);
                res.status(200).json(changeName);
            }
            catch (error) {
                console.log(error);
                res.status(501).json({ message: "Internal Server Error" });
            }
        });
    }
    changeUserPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userId;
                const token = req.cookies.userJWT;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    userId = decoded.id;
                }
                const { currentPassword, newPassword } = req.body;
                console.log(currentPassword, newPassword);
                const changePassword = yield this.usercase.changeUserPassword(userId, currentPassword, newPassword);
                res.cookie('userJWT', '', {
                    httpOnly: true,
                    expires: new Date(0)
                });
                res.status(200).json(changePassword);
            }
            catch (error) {
                console.log(error);
                res.status(501).json({ message: "Internal Server Error" });
            }
        });
    }
    changeUserEmail(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const userData = yield this.usercase.changeUserEmail(email);
                if (userData && userData.data && !userData.data.data) {
                    req.app.locals.user = email;
                    req.app.locals.otp = (_a = userData === null || userData === void 0 ? void 0 : userData.data) === null || _a === void 0 ? void 0 : _a.otp;
                    res.status(200).json(userData === null || userData === void 0 ? void 0 : userData.data);
                }
                else {
                    res.status(200).json({ data: true });
                }
            }
            catch (error) {
                console.log(error);
                res.status(501).json({ message: "Internal Server Error" });
            }
        });
    }
    changeUserEmailSave(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otpBody = req.body.otp;
                console.log("gdddf", otpBody);
                let userId;
                const token = req.cookies.userJWT;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    userId = decoded.id;
                }
                const otpSaved = req.app.locals.otp;
                console.log("optsa", otpBody, otpSaved);
                if (otpBody === otpSaved) {
                    const email = req.app.locals.user;
                    console.log("this", email, userId);
                    const editEmail = yield this.usercase.changeUserEmailSave(userId, email);
                    return res.status(200).json(editEmail);
                }
            }
            catch (error) {
                console.log(error);
                res.status(501).json({ message: "Internal Server Error" });
            }
        });
    }
    deleteProfilePicture(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userId;
                const token = req.cookies.vendorJWT;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    userId = decoded.id;
                }
                const imageStatus = yield this.usercase.deleteProfilePicture(userId);
                res.status(200).json(imageStatus);
            }
            catch (error) {
                res.status(501).json({ message: "Internal Server Error" });
            }
        });
    }
    changeProfilePicture(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('in controller');
                let userId;
                const token = req.cookies.vendorJWT;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    userId = decoded.id;
                }
                const image = req.files;
                const changeImage = yield this.usercase.changeProfilePicture(userId, image);
                res.status(200).json(changeImage);
            }
            catch (error) {
                console.log(error);
                res.status(501).json({ message: "Internal Server Error" });
            }
        });
    }
    // //to get all services from a parlour
    // async getAllServices (req:Request,res:Response){
    //     console.log('inside parlour service')
    //     const id = req.params.id
    //     console.log('id',id)
    // }
    //user logout
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.cookie('userJWT', '', {
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
exports.default = userController;
