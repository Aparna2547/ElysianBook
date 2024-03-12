import Category from "../../domain_entites/category";
import { CategoryModel } from "../database/CategoryModel";
import ICategoryRepository from "../../use_case/interface/categoryInterface";

class categoryRepository implements ICategoryRepository{



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
    async getCat(search:string,page:number){
        try {
console.log('repository')
            let limit = 5;
            let skip = (page -1) * limit;
            let totalCategories = await CategoryModel.find({}).countDocuments();
            let totalPages = Math.floor(totalCategories/limit)
            let categories = await CategoryModel.find({
                $or:[
                    {catName : {$regex : '^' + search, $options: "i" } },
                ]
            }).skip(skip).limit(limit);
            return {categories,totalPages}
        } catch (error) {
            console.log(error);
            
        }
    }

    //edit category
    async editCategory(id:string,catName:string,image:string){
        try {
            const editCategoryStatus = await CategoryModel.updateOne(
                {_id:id},{$set:{catName,image}}
            )
            return editCategoryStatus
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