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
    console.log(parlourFound);
    
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
        status:"Pending"
      },
    });
    console.log("Parlour details saved successfully");
    return parlourAdd

    console.log("enthnna");
  }


  async editParlour(vendorId:string,parlourData:Parlour){
    
    const parlourEdit = await ParlourModel.findByIdAndUpdate(vendorId, {
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
        status:"Pending"
      },
    });
    console.log("Parlour details saved successfully");
    return parlourEdit


  }
   async findVendorById(vendorId: string): Promise<any> {
    console.log('repo profile');
    const profileDetails = await ParlourModel.findOne({_id:vendorId},{name:1,email:1,parlourName:1,status:1,password:1,vendorImage:1})
    // console.log(profileDetails);
    
    return profileDetails
    
  }

  async editVendorName(vendorId:string,name:string){
    console.log('ayuo');
    
    const nameChangeStatus = await ParlourModel.findByIdAndUpdate(vendorId,{$set:{name}})
    console.log(nameChangeStatus);
    return nameChangeStatus
    
  }

  async editVendorPassword(vendorId:string,hashedPassword:string){
    const changePasswordStatus = await ParlourModel.findByIdAndUpdate(vendorId,{$set:{password:hashedPassword}})
    console.log('password changed');
    
    return changePasswordStatus
  }


  async editVendor(vendor:Parlour,vendorId:string) {
    const vendorEdit = await ParlourModel.findByIdAndUpdate(vendorId,vendor)
    return vendorEdit
  }
}

export default parlourRepository;
