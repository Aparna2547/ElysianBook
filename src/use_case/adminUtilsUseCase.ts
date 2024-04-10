import Cloudinary from "../infrastucture/utils/cloudinary";
import IAdminutilsRepository from "./interface/adminutilsInterface";

class Adminutilsusecase {
    private adminutilsRepository: IAdminutilsRepository;
    private cloudinary : Cloudinary

    constructor(adminutilsRepository: IAdminutilsRepository,cloudinary:Cloudinary) {
        this.adminutilsRepository = adminutilsRepository;
        this.cloudinary = cloudinary
    }

    async addFacility(facility: string) {
        try {
            console.log('inside usecase');
            const facilityStatus = await this.adminutilsRepository.addFacility(facility)
            console.log(facilityStatus);
            return {
                status:200,
                data:facilityStatus
            }
            

        } catch (error) {
            console.log(error);
            throw new Error("Failed to add facility"); // Throw error to be caught by callers
        }
    }

    async allFacilities(){
        try {
            // console.log('inside facilities')
            const facilities = await this.adminutilsRepository.allFacilities()
            // console.log(facilities);
            return {
                status:200,
                data:facilities
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }

    async addBanner(image:any){
        try {

            
    const uploadBanners = await Promise.all(
        image.map(async (file:any)=>{
            return await this.cloudinary.saveToCloudinary(file)
        })
    );
    console.log('up',uploadBanners)
            // const imageLink = await this.cloudinary.saveToCloudinary(image)
            // console.log(imageLink);

            const saveBanner = await this.adminutilsRepository.addBanner(uploadBanners)
            return {
                status:200,
            data:saveBanner
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }

    async getBanners(){
        try {
            const banners = await this.adminutilsRepository.getBanners()
            return{
                status:200,
                data:banners
            }
        } catch (error) {
            
        }
    }

    async deleteBanner(banner:string){
        try {
            const deleteBanner = await this.adminutilsRepository.deleteBanner(banner)
            return{
                status:200,
                data:deleteBanner
            }
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default Adminutilsusecase;
