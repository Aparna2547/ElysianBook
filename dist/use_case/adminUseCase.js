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
class Adminusecase {
    constructor(adminRepository, Encrypt, JWTtokens) {
        this.adminRepository = adminRepository;
        this.Encrypt = Encrypt;
        this.JWTtokens = JWTtokens;
    }
    //admin Login
    adminLogin(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('admin usecase');
                const adminFound = yield this.adminRepository.findByEmail(admin.email);
                if (adminFound) {
                    const passwordMatch = yield this.Encrypt.compare(admin.password, adminFound.password);
                    console.log('oasswordmatch');
                    if (passwordMatch) {
                        const token = this.JWTtokens.createJwt(adminFound._id, 'admin');
                        return {
                            status: 200,
                            data: {
                                success: true,
                                message: 'successfully logged in',
                                adminId: adminFound._id,
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
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //all users
    getUser(search, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.adminRepository.getUser(search, page);
                return {
                    status: 200,
                    data: users
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //admin user block
    blockUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('usecase', id);
                const userStatus = yield this.adminRepository.blockUser(id);
                return {
                    status: 200,
                    data: userStatus
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //show all vendors
    // async getVendor(search:string,page:number){
    //     try {
    //         const vendors = await this.adminRepository.getVendor(search,page)
    //         return {
    //             status:200,
    //             data:vendors
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    //block vendor
    blockVendor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('block user usecsase');
                const vendorStatus = yield this.adminRepository.blockVendor(id);
                return {
                    status: 200,
                    data: vendorStatus
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getParlours(search, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("getparlour usecase");
                const parlourStatus = yield this.adminRepository.getParlours(search, page);
                return {
                    status: 200,
                    data: parlourStatus
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    singleParlour(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('singleparlor');
                const singleParlour = yield this.adminRepository.getSingleParlourDetails(id);
                return {
                    status: 200,
                    data: singleParlour
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    parlourRequestConfirmation(id, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('inside parlourRequestConfirmation usecase');
                const parlourRequest = yield this.adminRepository.parlourRequest(id, value);
                return {
                    status: 200,
                    data: parlourRequest
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    totalDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('hello');
                const totalDetails = yield this.adminRepository.totalDetails();
                return {
                    status: 200,
                    data: totalDetails
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    data: 'internal server error'
                };
            }
        });
    }
    monthlyData(year) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.adminRepository.monthlyData(year);
                return {
                    status: 200,
                    data: res
                };
            }
            catch (error) {
                return {
                    status: 401,
                    data: 'internal server error'
                };
            }
        });
    }
}
exports.default = Adminusecase;
