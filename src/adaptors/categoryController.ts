import {Request,Response} from "express"
import Categoryusecase from "../use_case/categoryUseCase"

class categoryController{
    private catergorycase : Categoryusecase
    constructor(categorycase:Categoryusecase){
        this.catergorycase = categorycase
    }


    //get all category
    async getCategory(req:Request,res:Response){
        try {
            console.log('all categories');
            const allCategory = await this.catergorycase.getCategory()
            res.status(200).json(allCategory?.data)
            
        } catch (error) {
            console.log(error);
            
        }
    }

    //add category
    async addCategory(req:Request,res:Response){
        try {
            console.log('heklo',req.file);
            const image = req.file as object
            
            const category = req.body.category
            // console.log(catName);
            const categoryStatus = await this.catergorycase.addCat(category,image)
            res.status(200).json(categoryStatus)
            
        } catch (error) {
            console.log(error);
            
        }
    }

    //edit Category
    async editCategory(req:Request,res:Response){
        try {
            const {catName}= req.body
            const id = req.params.id as string
            const catFound = await this.catergorycase.editCat(id)
            res.status(200).json(catFound)
        } catch (error) {
            console.log(error);
            
        }
    }

    //delete category
    async hideCategory(req:Request,res:Response){
        try {
            const id:string = req.params.id
            console.log('costroller',id);
            
            const Data = await this.catergorycase.hideCat(id)
            res.status(200).json(Data)
        } catch (error) {
            console.log(error);
            
        }   
    }
}

export default categoryController