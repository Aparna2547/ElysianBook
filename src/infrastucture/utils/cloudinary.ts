import { v2 as cloudinary } from 'cloudinary';
import CloudinaryRepository from '../../use_case/interface/cloudinaryInterface';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD ,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


class Cloudinary implements CloudinaryRepository{
    async saveToCloudinary(file: any) {
        const result = await cloudinary.uploader.upload(file?.path)
        file = result.secure_url
        return file
    }
}

export default Cloudinary