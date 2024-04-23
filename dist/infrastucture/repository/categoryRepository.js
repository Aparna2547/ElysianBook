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
const CategoryModel_1 = require("../database/CategoryModel");
class categoryRepository {
    //cahecking existing category
    findCategory(catName) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('inside findcategory');
            const existingCat = yield CategoryModel_1.CategoryModel.findOne({ catName: catName });
            if (existingCat) {
                return existingCat;
            }
            else {
                return null;
            }
        });
    }
    //cahecking existing category by Id
    findCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('inside findcategory');
            const existingCat = yield CategoryModel_1.CategoryModel.findById(id);
            if (existingCat) {
                return existingCat;
            }
            else {
                return null;
            }
        });
    }
    // save category
    saveCategory(catName, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCategory = new CategoryModel_1.CategoryModel({ catName, image });
            yield newCategory.save();
            return newCategory;
        });
    }
    //all category
    getCat(search, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('repository');
                let limit = 4;
                let skip = (page - 1) * limit;
                let totalCategories = yield CategoryModel_1.CategoryModel.find({}).countDocuments();
                let totalPages = Math.floor(totalCategories / limit);
                let categories = yield CategoryModel_1.CategoryModel.find({
                    $or: [
                        { catName: { $regex: '^' + search, $options: "i" } },
                    ]
                }).skip(skip).limit(limit);
                return { categories, totalPages };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //edit category
    editCategory(id, catName, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const editCategoryStatus = yield CategoryModel_1.CategoryModel.updateOne({ _id: id }, { $set: { catName, image } });
                return editCategoryStatus;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    hideCat(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const catDetails = yield CategoryModel_1.CategoryModel.findById(id);
                console.log(catDetails);
                if (!catDetails) {
                    console.log('Category not found');
                    return null;
                }
                console.log(catDetails);
                let catStatus;
                if (catDetails.hide === false) {
                    console.log('It is viewing');
                    catStatus = yield CategoryModel_1.CategoryModel.updateOne({ _id: id }, { $set: { hide: true } });
                }
                else {
                    catStatus = yield CategoryModel_1.CategoryModel.updateOne({ _id: id }, { $set: { hide: false } });
                }
                return catStatus;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
}
exports.default = categoryRepository;
