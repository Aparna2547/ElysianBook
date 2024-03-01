import IAdminutilsRepository from "./interface/adminutilsInterface";

class Adminutilsusecase {
    private adminutilsRepository: IAdminutilsRepository;

    constructor(adminutilsRepository: IAdminutilsRepository) {
        this.adminutilsRepository = adminutilsRepository;
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
}

export default Adminutilsusecase;
