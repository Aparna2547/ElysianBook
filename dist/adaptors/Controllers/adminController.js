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
class adminController {
    constructor(admincase) {
        this.admincase = admincase;
    }
    //email verifying
    verifyEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('admin controller');
                const admin = yield this.admincase.adminLogin(req.body);
                if (admin && admin.data && typeof admin.data === 'object' && 'token' in admin.data) {
                    res.cookie('adminJWT', admin.data.token, {
                        httpOnly: true,
                        secure: process.env.Node_ENV !== 'development',
                        sameSite: 'strict',
                        maxAge: 30 * 24 * 60 * 60 * 1000,
                    });
                }
                res.status(admin.status).json(admin.data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //getting all users
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('all users');
                const search = req.query.search || "";
                const page = parseInt(req.query.page);
                console.log(search, 'search');
                const allUsers = yield this.admincase.getUser(search, page);
                res.status(200).json(allUsers === null || allUsers === void 0 ? void 0 : allUsers.data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //user blocking and unblocking
    blockUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('inside controller');
                const id = req.query.id;
                // console.log('controller',id)
                const userStatus = yield this.admincase.blockUser(id);
                res.status(200).json(userStatus);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //list all vendors
    // async getVendors(req:Request,res:Response){
    //     try {
    //         console.log('all vendrs');
    //         const search = req.query.search as string
    //         const page = parseInt(req.query.page as string)
    //         const allVendors = await this.admincase.getVendor(search,page)
    //         console.log(allVendors);
    //         res.status(200).json(allVendors?.data)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    //block vendor
    blockVendor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('all block vendors');
                const id = req.body.id;
                const vendorStatus = yield this.admincase.blockVendor(id);
                res.status(200).json(vendorStatus);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getParlours(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('getParlours');
                const search = req.query.search;
                const page = parseInt(req.query.page);
                const parlourStatus = yield this.admincase.getParlours(search, page);
                res.status(200).json(parlourStatus);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    singleParlourDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.query.id;
                console.log('controller work aavanee', id);
                const singleParlourStatus = yield this.admincase.singleParlour(id);
                res.status(200).json(singleParlourStatus);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    parlourRequestConfirmation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('inside the new page');
                const id = req.body.id;
                const value = req.body.value;
                console.log(value, 'value');
                console.log(id, 'id');
                const confirmationValue = yield this.admincase.parlourRequestConfirmation(id, value);
                res.status(200).json(confirmationValue);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //for taking all details
    totalDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalDetails = yield this.admincase.totalDetails();
                res.status(200).json(totalDetails);
            }
            catch (error) {
                console.log(error);
                res.status(500).json('internal server error');
            }
        });
    }
    monthlyData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const year = parseInt(req.query.year);
                const totalDetails = yield this.admincase.monthlyData(year);
                res.status(200).json(totalDetails);
            }
            catch (error) {
            }
        });
    }
    //admin logout
    adminLogout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.cookie('adminJWT', '', {
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
exports.default = adminController;
