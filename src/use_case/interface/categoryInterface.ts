import Category from "../../domain_entites/category"


interface CategoryRepository{
saveCategory(category:string,image:string):Promise<any>,
getCat():Promise<any>,
findCategory(catName:string):Promise<any>,
findCategoryById(id:string):Promise<any>,
editCat(id:string,catName:string):Promise<any>,
hideCat(id:string):Promise<any>

}

export default CategoryRepository