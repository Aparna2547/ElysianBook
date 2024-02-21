import Category from "../../domain/category";
import { CategoryModel } from "../database/CategoryModel";
import CategoryRepository from "../../use_case/interface/categoryInterface";

class categoryRepository implements CategoryRepository{



    //cahecking existing category
    async findCategory(catName:string){
        console.log('inside findcategory');
        const existingCat = await CategoryModel.findOne({catName:catName})
        if(existingCat){
            return existingCat
        }else{
            return null
        }
        
    }


     //cahecking existing category by Id
     async findCategoryById(id:string){
        console.log('inside findcategory');
        const existingCat = await CategoryModel.findById(id)
        if(existingCat){
            return existingCat
        }else{
            return null
        }
        
    }
    // save category
    async saveCategory(catName:string,image:string){
        const newCategory = new CategoryModel({catName,image})
        await newCategory.save()
        return newCategory
    }


    //all category
    async getCat(){
        try {
            const showCat = await CategoryModel.find()
            console.log(showCat);
            return showCat
            
        } catch (error) {
            console.log(error);
            
        }
    }

    //edit category
    async editCat(catName:string,id:string){
        try {
            const Data = await CategoryModel.updateOne(
                {_id:id},{$set:{catName}}
            )
        } catch (error) {
            console.log(error);
            
        }
    }

    async hideCat(id:string){
        try {
            const catDetails = await CategoryModel.findById(id);
            console.log(catDetails)
            if (!catDetails) {
                console.log('Category not found');
                return null; 
            }
            console.log(catDetails);
            let catStatus;
            if (catDetails.hide === false) {
                console.log('It is viewing');
                catStatus = await CategoryModel.updateOne(
                    { _id: id },
                    { $set: { hide: true } }
                );
            } else {
                catStatus = await CategoryModel.updateOne(
                    { _id: id },
                    { $set: { hide: false } }
                );
            }
            return catStatus;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default categoryRepository