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
const serviceModel_1 = require("../database/serviceModel");
const CategoryModel_1 = require("../database/CategoryModel");
const mongoose_1 = require("mongoose");
class serviceRepository {
    findService(serviceName) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('imnside service repositoru');
            const existingService = yield serviceModel_1.ServiceModel.findOne({ serviceName: serviceName });
            if (existingService) {
                return existingService;
            }
            else {
                return null;
            }
        });
    }
    saveService(vendorId, serviceName, category, duration, description, price, image) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('inside service repo');
            // // const newService = new ServiceModel({serviceName,category,duration,description,price,image})
            // // await newService.save();
            // const newService = await ServiceModel.updateOne({_id:vendorId},{serviceName,category,duration,description,price,image},{upsert:true})
            // console.log('service added',newService)
            // return newService
            // const filter = { _id: vendorId };
            const update = {
                vendorId,
                serviceName,
                category,
                duration,
                description,
                price,
                image
            };
            // const options = { upsert: true };
            const newService = yield serviceModel_1.ServiceModel.insertMany(update);
            console.log('service added', newService);
            return newService;
        });
    }
    categoriesToShow() {
        return __awaiter(this, void 0, void 0, function* () {
            const showCategories = yield CategoryModel_1.CategoryModel.find({ hide: false });
            // console.log(showCategories)
            return showCategories;
        });
    }
    showAllServices(vendorId, search, page) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('allservice repo');
            const limit = 4;
            const skip = (page - 1) * limit;
            try {
                // Count total number of services for pagination
                const totalServices = yield serviceModel_1.ServiceModel.find({ _id: vendorId }).countDocuments();
                const totalPages = Math.ceil(totalServices / limit);
                // Query services with pagination and search filter
                const allservices = yield serviceModel_1.ServiceModel.find({
                    vendorId: vendorId,
                    serviceName: { $regex: search, $options: "i" }
                }).skip(skip).limit(limit).populate('category');
                return { allservices, totalPages };
            }
            catch (error) {
                console.error('Error fetching all services:', error);
                throw error;
            }
        });
    }
    listService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('repo', id);
            const service = yield serviceModel_1.ServiceModel.findById(id);
            if (service) {
                service.isListed = !service.isListed;
                yield service.save();
                console.log(service);
            }
            else {
                console.log('Service not found');
            }
        });
    }
    //editing
    findServiceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('findservicebyid', id);
            const existingService = yield serviceModel_1.ServiceModel.findById({ _id: id });
            if (existingService) {
                return existingService;
            }
            else {
                return null;
            }
        });
    }
    editService(id, serviceName, category, duration, price, description, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const editService = yield serviceModel_1.ServiceModel.updateOne({ _id: id }, { $set: {
                        serviceName,
                        category,
                        duration,
                        price,
                        description,
                        image
                    } });
                return editService;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //getting services and categories to user
    getServicesInUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pipeline = [
                    {
                        $match: {
                            vendorId: new mongoose_1.Types.ObjectId(id),
                            isListed: true,
                        },
                    },
                    {
                        $lookup: {
                            from: 'categories', // Assuming 'categories' is the collection name for Category model
                            localField: 'category',
                            foreignField: '_id',
                            as: 'categoryDetails',
                        },
                    },
                    {
                        $group: {
                            _id: '$categoryDetails.catName', // Use category name instead of _id
                            services: {
                                $push: {
                                    serviceName: '$serviceName',
                                    duration: '$duration',
                                    price: '$price',
                                    image: '$image',
                                    description: '$description',
                                    isListed: '$isListed',
                                    category: '$categoryDetails.name', // Include category name
                                },
                            },
                        },
                    }
                ];
                const groupedServices = yield serviceModel_1.ServiceModel.aggregate(pipeline);
                console.log('grou', groupedServices);
                return groupedServices;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = serviceRepository;
