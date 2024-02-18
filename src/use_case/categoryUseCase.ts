import { errorMonitor } from "nodemailer/lib/xoauth2";
import Category from "../domain/category";
import categoryRepository from "../infrastucture/repository/categoryRepository";
import { CategoryModel } from "../infrastucture/database/CategoryModel";

class Categoryusecase{
    private categoryRepository :categoryRepository


    constructor(categoryRepository:categoryRepository){
        this.categoryRepository = categoryRepository
    }


    //all categiry
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
        async addCat(category:any){
            try {
                const catFound = await this.categoryRepository.findCategory(category.catName)
                if(catFound){
                    console.log('already exist');

                    return{
                        status:200,
                        data:{
                            data:true
                        }
                    }
                    
                    
                }else{
                    const catSave = await this.categoryRepository.saveCategory(category)
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
