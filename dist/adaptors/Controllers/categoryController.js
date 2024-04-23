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
class categoryController {
    constructor(categorycase) {
        this.catergorycase = categorycase;
    }
    //get all category
    getCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('all categories');
                const page = parseInt(req.query.page);
                const search = req.query.search;
                const allCategory = yield this.catergorycase.getCategory(search, page);
                res.status(200).json(allCategory === null || allCategory === void 0 ? void 0 : allCategory.data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //add category
    addCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('heklo', req.file);
                const image = req.file;
                const category = req.body.category;
                // console.log(catName);
                const categoryStatus = yield this.catergorycase.addCat(category, image);
                res.status(200).json(categoryStatus);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //edit Category
    editCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { catName } = req.body;
                const id = req.query.id;
                const image = req.file;
                console.log(image);
                const catFound = yield this.catergorycase.editCategory(id, catName, image);
                res.status(200).json(catFound);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //list category
    hideCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.query.id;
                console.log('controller', id);
                const Data = yield this.catergorycase.hideCat(id);
                res.status(200).json(Data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = categoryController;
