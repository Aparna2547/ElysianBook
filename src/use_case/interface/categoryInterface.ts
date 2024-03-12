import Category from "../../domain_entites/category"


interface ICategoryRepository{
saveCategory(category:string,image:string):Promise<any>,
getCat(search:string,page:number):Promise<any>,
findCategory(catName:string):Promise<any>,
findCategoryById(id:string):Promise<any>,
editCategory(id:string,catName:string,image:string):Promise<any>,
hideCat(id:string):Promise<any>

}

export default ICategoryRepository