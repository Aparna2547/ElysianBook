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
class serviceController {
    constructor(servicecase) {
        this.servicecase = servicecase;
    }
    addService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('inside service controller');
                let vendorId;
                const token = req.cookies.vendorJWT;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    vendorId = decoded.id;
                }
                console.log(vendorId);
                const image = req.file;
                const { serviceName, category, duration, description, price } = req.body;
                console.log('cate', category);
                const newService = yield this.servicecase.addService(vendorId, serviceName, category, duration, description, price, image);
                res.status(200).json(newService);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    categoriesToShow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('controlleer ');
                const showCategories = yield this.servicecase.categoriesToShow();
                res.status(200).json(showCategories);
            }
            catch (error) {
            }
        });
    }
    //display all services
    showAllServices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let vendorId;
                const token = req.cookies.vendorJWT;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    vendorId = decoded.id;
                }
                console.log('show all services controller');
                const search = req.query.search;
                const page = parseInt(req.query.page);
                const showAllServices = yield this.servicecase.showAllServices(vendorId, search, page);
                res.status(200).json(showAllServices);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //edit services
    editService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("inside edit service controller");
                const serviceName = req.body.serviceName;
                console.log('servicename:', serviceName);
                const { category, duration, price, description } = req.body;
                const id = req.query.id;
                const image = req.file;
                console.log(id, serviceName, category, duration, price, description, image);
                const serviceFound = yield this.servicecase.editService(id, serviceName, category, duration, price, description, image);
                res.status(200).json(serviceFound);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //list services
    listService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.query.id;
                console.log('controller,id', id);
                const serviceData = yield this.servicecase.listService(id);
                res.status(200).json(serviceData);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getServicesInUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('helo category');
                const id = req.query.id;
                console.log('id', id);
                const showService = yield this.servicecase.getServicesInUser(id);
                res.status(200).json(showService);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = serviceController;
