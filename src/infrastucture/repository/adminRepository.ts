import Admin from "../../domain_entites/admin";
import { adminModel } from "../database/adminModel";
import IAdminRepository from "../../use_case/interface/adminInterface";
import { UserModel } from "../database/userModel";
import { ParlourModel } from "../database/ParlourModel";

class adminRepository implements IAdminRepository {
  async findByEmail(email: string) {
    console.log("email check");
    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return existingAdmin;
    } else {
      return null;
    }
  }

  //getting user
  async getUser() {
    try {
      console.log("skdjfhkdjh");
      const showUser = await UserModel.find();
      // console.log(showUser)
      return showUser;
    } catch (error) {
      console.log(error);
    }
  }

  //block user
  async blockUser(id: string) {
    console.log(id);
    console.log("block user");
    const user = await UserModel.findById(id);
    console.log(user);
    if (user) {
      let userStatus;
      if (user.isBlocked === false) {
        console.log("user is unblocked");
        userStatus = await UserModel.updateOne(
          { _id: id },
          { $set: { isBlocked: true } }
        );
      } else {
        userStatus = await UserModel.updateOne(
          { _id: id },
          { $set: { isBlocked: false } }
        );
      }
      return userStatus;
    } else {
      return null;
    }
  }

  //list all vendors
  async getVendor() {
    console.log("all vendors-usecase");
    const showVendors = await ParlourModel.find();
   //  console.log(showVendors);l
    return showVendors;
  }

  //block vendor
  async blockVendor(id: string) {
    console.log("inside repo");
    const vendorDetails = await ParlourModel.findById(id);
    if (vendorDetails) {
      let vendorStatus;
      if (vendorDetails.isBlocked === false) {
        console.log("vendor is unblocked");
        vendorStatus = await ParlourModel.updateOne(
          { _id: id },
          { $set: { isBlocked: true } }
        );
      } else {
        vendorStatus = await ParlourModel.updateOne(
          { _id: id },
          { $set: { isBlocked: false } }
        );
      }
      return vendorStatus;
    } else {
      return null;
    }
  }

  async getSingleParlourDetails(id: string) {
    const parlourDetails = await ParlourModel.findOne({ _id: id });
    return parlourDetails;
  }

  async parlourRequest(id:string,value:string){
   const requestParlour= await ParlourModel.updateOne({_id:id},{$set:{status:value}})
   return requestParlour;
  }
}
export default adminRepository;
