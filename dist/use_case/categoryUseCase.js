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
class Categoryusecase {
    constructor(categoryRepository, cloudinary) {
        this.categoryRepository = categoryRepository;
        this.cloudinary = cloudinary;
    }
    //all category
    getCategory(search, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('controller');
                const category = yield this.categoryRepository.getCat(search, page);
                return {
                    status: 200,
                    data: category
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //add category
    addCat(category, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const catFound = yield this.categoryRepository.findCategory(category);
                if (catFound) {
                    console.log('already exist');
                    return {
                        status: 200,
                        data: false
                    };
                }
                else {
                    //cloudinary
                    const imageLink = yield this.cloudinary.saveToCloudinary(image);
                    console.log(imageLink);
                    const catSave = yield this.categoryRepository.saveCategory(category, imageLink);
                    return {
                        status: 200,
                        data: catSave
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editCategory(id, catName, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryFound = yield this.categoryRepository.findCategoryById(id);
                // console.log(Data);
                // if(Data){
                let imageLink;
                if (image) {
                    imageLink = yield this.cloudinary.saveToCloudinary(image);
                    console.log(imageLink);
                }
                else {
                    imageLink = categoryFound.image;
                }
                const editedData = yield this.categoryRepository.editCategory(id, catName, imageLink);
                return {
                    status: 200,
                    data: editedData
                };
                // }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //hide
    // async hideCat(id:string){
    //     try {
    //         const catDetails = await CategoryModel.findById(id)
    //         console.log(catDetails);
    //         let catStatus;
    //         if(catDetails.hide===false){
    //             console.log('it is viewing');
    //             catStatus = await CategoryModel.updateOne(
    //                 {_id:id},
    //                 {$set:{hide:true}}
    //             )
    //         }else{
    //             catStatus= await CategoryModel.updateOne(
    //                 {_id:id},{
    //                     $set:{hide:false}
    //                 }
    //             )
    //         }
    //         return catStatus
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    hideCat(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('usecase', id);
                const catStatus = yield this.categoryRepository.hideCat(id);
                return {
                    status: 200,
                    data: catStatus
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = Categoryusecase;
