import mongoose from 'mongoose'


export const connectDb = async() =>{
    try {
        const mongo_uri = process.env.MONGO_URI as string
        await mongoose.connect(mongo_uri)
        console.log('connected to db');
        
    } catch (error) {
        console.log(error);
        
    }
}