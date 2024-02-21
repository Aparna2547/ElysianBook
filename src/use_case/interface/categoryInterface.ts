import Category from "../../domain/category";


interface CategoryRepository{
saveCategory(category:string,image:string):Promise<any>,
}

export default CategoryRepository