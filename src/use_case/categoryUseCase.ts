import { errorMonitor } from "nodemailer/lib/xoauth2";
import Category from "../domain/category";
import categoryRepository from "../infrastucture/repository/categoryRepository";
import { CategoryModel } from "../infrastucture/database/CategoryModel";
import Cloudinary from "../infrastucture/utils/cloudinary";

class Categoryusecase{
    private categoryRepository :categoryRepository
    private cloudinary : Cloudinary


    constructor(categoryRepository:categoryRepository,cloudinary:Cloudinary){
        this.categoryRepository = categoryRepository
        this.cloudinary = cloudinary
    }


    //all category
    async getCategory(){
        try {
            const category = await this.categoryRepository.getCat()
            return {
                status:200,
                data:category
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    //add category
        async addCat(category:string,image:object){
            try {
                const catFound = await this.categoryRepository.findCategory(category)
                if(catFound){
                    console.log('already exist');

                    return{
                        status:200,
                        data:false
                    }
                    
                    
                }else{
                    //cloudinary
                    const imageLink = await this.cloudinary.saveToCloudinary(image)
                    console.log(imageLink);
                    

                    const catSave = await this.categoryRepository.saveCategory(category,imageLink)
                    return{
                        status:200,
                        data:catSave
                    }
                }
            
            } catch (error) {
                console.log(error);
                
            }
        }
        async editCat(category:any){
            try {
                const Data = await this.categoryRepository.findCategoryById(category._id)
                console.log(Data);
                if(Data){
                    const editedData =await this.categoryRepository.editCat(category.catName,category.id)
                    return{
                        status:200,
                        data:editedData
                    }
                }
                
            } catch (error) {
                console.log(error);
                
            }
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
        async hideCat(id: string) {
           try {
            console.log('usecase',id)
            const catStatus = await this.categoryRepository.hideCat(id)
            return{
                status:200,
                data:catStatus
            }
           } catch (error) {
            console.log(error)
           }
        }
        

        
}

export default Categoryusecase
