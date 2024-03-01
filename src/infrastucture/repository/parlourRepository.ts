import Parlour from "../../domain_entites/parlour";
import { ParlourModel } from "../database/ParlourModel";
import IParlourRepository from "../../use_case/interface/parlourInterface";
import { parseCommandLine } from "typescript";

class parlourRepository implements IParlourRepository {
  async saveParlour(parlour: Parlour) {
    console.log("inside ad db");
    const newParlour = new ParlourModel(parlour);
    await newParlour.save();
    return newParlour;
  }

  async findByEmail(email: string) {
    console.log("email exist check");
    const existingParlour = await ParlourModel.findOne({ email });
    if (existingParlour) {
      return existingParlour;
    } else {
      return null;
    }
  }

  async findParlourById(parlour: string) {
    const parlourFound = await ParlourModel.findById(parlour);
    return parlourFound;
  }

  //change password
  async changePassword(email: string, password: string) {
    const changePasswordStatus = await ParlourModel.updateOne(
      { email },
      { $set: { password: password } }
    );
    return changePasswordStatus;
  }

  async addParlour(parlourData: Parlour, vendorId: string): Promise<any> {
    console.log("final step", parlourData);

    const parlourAdd = await ParlourModel.findByIdAndUpdate(vendorId, {
      $set: {
        parlourName: parlourData.parlourName,
        landmark: parlourData.landmark,
        locality: parlourData.locality,
        district: parlourData.district,
        openingTime: parlourData.openingTime,
        closingTime: parlourData.closingTime,
        contact: parlourData.contact,
        seats: parlourData.seats,
        latitude: parlourData.latitude,
        longitude: parlourData.longitude,
        facilities: parlourData.facilities,
        banners: parlourData.banners,
        status:"pending"
      },
    });
    console.log("Parlour details saved successfully");
    return parlourAdd

    console.log("enthnna");
  }
}

export default parlourRepository;
