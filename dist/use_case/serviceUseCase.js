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
class Serviceusecase {
    constructor(serviceRepository, cloudinary) {
        this.serviceRepository = serviceRepository;
        this.cloudinary = cloudinary;
    }
    addService(venodrId, serviceName, category, duration, description, price, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('service add usecase');
                const serviceFound = yield this.serviceRepository.findService(serviceName);
                if (serviceFound) {
                    console.log('service already exist');
                    return {
                        status: 200,
                        data: false
                    };
                }
                else {
                    const imageLink = yield this.cloudinary.saveToCloudinary(image);
                    console.log(imageLink);
                    const serviceSave = yield this.serviceRepository.saveService(venodrId, serviceName, category, duration, description, price, imageLink);
                    return {
                        status: 200,
                        data: serviceSave
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    categoriesToShow() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('serviceusecase');
                const showCategories = yield this.serviceRepository.categoriesToShow();
                return {
                    status: 200,
                    data: showCategories
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    showAllServices(vendorId, search, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('inside allsercice usecase');
                const showAllServices = yield this.serviceRepository.showAllServices(vendorId, search, page);
                return {
                    status: 200,
                    data: showAllServices
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //listing
    listService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('usecaSe ', id);
                const serviceStatus = yield this.serviceRepository.listService(id);
                return {
                    status: 200,
                    data: serviceStatus
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //editing
    editService(id, serviceName, category, duration, price, description, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceFound = yield this.serviceRepository.findServiceById(id);
                let imageLink;
                if (image) {
                    imageLink = yield this.cloudinary.saveToCloudinary(image);
                    console.log(imageLink);
                }
                else {
                    imageLink = serviceFound.image;
                }
                const editedData = yield this.serviceRepository.editService(id, serviceName, category, duration, price, description, imageLink);
                return {
                    status: 200,
                    data: editedData
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getServicesInUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('in usecase');
                const servicesInUser = yield this.serviceRepository.getServicesInUser(id);
                return {
                    status: 200,
                    data: servicesInUser
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = Serviceusecase;
