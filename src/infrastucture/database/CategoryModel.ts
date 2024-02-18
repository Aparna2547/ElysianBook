import mongoose,{Document,Schema} from "mongoose"

interface Category extends Document{
    catName:String,
    image:String,
    hide:Boolean
}

const categorySchema : Schema<Category>  = new mongoose.Schema({
    catName:{
        type:String
    },
    image:{
        type:String
    },
    hide:{
        type:Boolean,
        default:false

    }
})

const CategoryModel = mongoose.model<Category>('category',categorySchema)
export {CategoryModel}