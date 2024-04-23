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
;
class Userusecase {
    constructor(userRepository, sendOtp, otpGen, Encrypt, JWTtokens, cloudinary) {
        this.userRepository = userRepository;
        this.sendOtp = sendOtp;
        this.otpGen = otpGen;
        this.Encrypt = Encrypt;
        this.JWTtokens = JWTtokens;
        this.cloudinary = cloudinary;
    }
    findUser(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('inside usecase');
            const userFound = yield this.userRepository.findByEmail(email);
            if (userFound) {
                console.log('userfound');
                return {
                    status: 200,
                    data: {
                        data: true
                    }
                };
            }
            else {
                const otp = yield this.otpGen.genOtp(4);
                console.log(otp, 'otp');
                const mailDetails = yield this.sendOtp.sendMail(name, email, otp);
                console.log('maildetails');
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
    //saving user to the db
    saveUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield this.Encrypt.createHash(user.password);
                user.password = hashedPassword;
                const userSave = yield this.userRepository.saveUser(user);
                return {
                    status: 200,
                    data: userSave
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //in the case of forgot password
    findUserByMail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(email);
            console.log('inside forgot usecase');
            const userFound = yield this.userRepository.findByEmail(email);
            // console.log(userFound,'userfound')
            if (userFound) {
                const otp = yield this.otpGen.genOtp(4);
                console.log(otp, 'otp');
                const mailDetails = yield this.sendOtp.forgotSendMail(email, otp);
                // console.log('mail details:', mailDetails);
                console.log('user found');
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
                        data: true,
                    }
                };
            }
        });
    }
    //change password
    passwordChange(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFound = yield this.userRepository.findByEmail(email);
            if (userFound) {
                const hashedPassword = yield this.Encrypt.createHash(password);
                const savePasswordStatus = yield this.userRepository.changePassword(email, hashedPassword);
                return savePasswordStatus;
            }
        });
    }
    //login user
    logIn(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('user usecase');
                const userFound = yield this.userRepository.findByEmail(user.email);
                console.log(userFound);
                if (userFound) {
                    if (userFound.isBlocked) {
                        return {
                            status: 200,
                            data: {
                                success: false,
                                message: "You are blocked"
                            }
                        };
                    }
                    const passwordMatch = yield this.Encrypt.compare(user.password, userFound.password);
                    console.log('passwordMatch');
                    if (passwordMatch) {
                        const userId = userFound._id;
                        const accessToken = this.JWTtokens.generateAccessToken(userId, 'user');
                        const refreshToken = this.JWTtokens.generateRefreshToken(userId);
                        // const token = this.JWTtokens.createJwt(userFound._id, 'user');
                        // return {
                        //     status: 200,
                        //     data: {
                        //         success: true,
                        //         message: 'authentication success',
                        //         userId: userFound._id,
                        //         token: token
                        //     }
                        // };
                        return {
                            status: 200,
                            data: {
                                success: true,
                                message: "authentication success",
                                userId: userFound._id,
                                accessToken: accessToken,
                                refreshToken: refreshToken
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
    //google user signup
    gSignupUser(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFound = yield this.userRepository.findByEmail(email);
                if (userFound) {
                    return {
                        status: 200,
                        data: false
                    };
                }
                else {
                    const hashedPassword = yield this.Encrypt.createHash(password);
                    const userSave = yield this.userRepository.saveUser({ name, email, password: hashedPassword });
                    return {
                        status: 200,
                        data: userSave
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    parloursToShow(page, location) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parlours = yield this.userRepository.getParloursToShow(page, location);
                return {
                    status: 200,
                    data: parlours
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    singleParlourDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const singleParlour = yield this.userRepository.getSingleParlourDetails(id);
                return {
                    status: 200,
                    data: singleParlour
                };
            }
            catch (error) {
                return {
                    status: 400,
                    data: error
                };
            }
        });
    }
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this.userRepository.getAllCategories();
                return {
                    status: 200,
                    data: categories
                };
            }
            catch (error) {
                return {
                    status: 200,
                    data: error
                };
            }
        });
    }
    userProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFound = yield this.userRepository.findById(userId);
                return {
                    status: 200,
                    data: userFound
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    changeUserName(userId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('use');
                let userFound = yield this.userRepository.findById(userId);
                userFound.name = name;
                const changeName = yield this.userRepository.editUser(userId, userFound);
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
    changeUserPassword(userId, currentPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFound = yield this.userRepository.findById(userId);
                const passwordMatch = yield this.Encrypt.compare(currentPassword, userFound.password);
                if (passwordMatch) {
                    const hashedPassword = yield this.Encrypt.createHash(newPassword);
                    userFound.password = hashedPassword;
                    const changePassword = yield this.userRepository.editUser(userId, userFound);
                    return {
                        status: 200,
                        data: changePassword
                    };
                }
                else {
                    console.log('password current worng');
                    return {
                        status: 400,
                        error: 'Current password is incorrect'
                    };
                }
            }
            catch (error) {
            }
        });
    }
    changeUserEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('usercase email');
                const userFound = yield this.userRepository.findByEmail(email);
                if (!userFound) {
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
    changeUserEmailSave(userId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userFound = yield this.userRepository.findById(userId);
                userFound.email = email;
                const emailEdit = yield this.userRepository.editUser(userId, userFound);
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
    deleteProfilePicture(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFound = yield this.userRepository.findById(userId);
                const image = userFound.image;
                const imageDelete = yield this.userRepository.deleteProfilePicture(userId, image);
                return {
                    status: 200,
                    data: imageDelete
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    changeProfilePicture(userId, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFound = yield this.userRepository.findById(userId);
                if (userFound) {
                    const imageLink = yield this.cloudinary.saveToCloudinary(image);
                    console.log(imageLink);
                    const imageSave = yield this.userRepository.saveProfileImage(userId, imageLink);
                    return {
                        status: 200,
                        data: imageSave
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = Userusecase;
