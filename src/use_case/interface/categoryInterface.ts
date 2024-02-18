import Category from "../../domain/category";


interface CategoryRepository{
saveCategory(category:Category):Promise<any>,
}

export default CategoryRepository