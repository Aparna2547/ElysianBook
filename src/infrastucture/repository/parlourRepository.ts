import Parlour from "../../domain_entites/parlour";
import { ParlourModel } from "../database/ParlourModel";
import IParlourRepository from "../../use_case/interface/parlourInterface";
import { parseCommandLine } from "typescript";
import { ServiceModel } from "../database/serviceModel";
import { BookingModel } from "../database/bookingModel";
import mongoose from "mongoose";

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

  async dashboardDetails(parlourId:string){
    const objectId = new mongoose.Types.ObjectId(parlourId);
    console.log(objectId)
    const allServices = await ServiceModel.find({vendorId:parlourId}).countDocuments()
    console.log(allServices,'dknkdc');

    const allBookings = await BookingModel.find({parlourId}).countDocuments()
    console.log(allBookings);

    const cancelledBookings = await BookingModel.find({parlourId:parlourId,status:"cancelled"}).countDocuments()
    console.log('dfs',cancelledBookings)

    const revenue = await BookingModel.aggregate([
      {
        $match:{
          parlourId:objectId,
          status:'completed'
        }
      },
      {
        $group:{
          _id:'$parlourId',
          totalPrice:{$sum:"$totalPrice"}
        }
      },
      {$project:{
        _id:0,
        totalPrice:1
      }
    }
    ])
    const totalRevenue = revenue.length > 0 ? revenue[0].totalPrice : 0;

    console.log('revenye',totalRevenue)

    const profit = Math.floor(totalRevenue * (20 /100))
    console.log(profit)
    
    return {allServices,allBookings,totalRevenue,cancelledBookings,profit}
    
  }

  async getMonthlyCompletedBooking(parlourId:string,year:number){
  const startDate  = new Date(year,0,1)
    const endDate = new Date(year +1 , 0, 1)
    const objectId = new mongoose.Types.ObjectId(parlourId);
    console.log(startDate,endDate);
    
    const result = await BookingModel.aggregate([
      {
        $match:{
          parlourId:objectId,
          status:'completed',
          date:{$gte:startDate,$lt:endDate}
        }
      },
      {
        $group:{
          _id:{
            month:{$month:"$date"},
            year:{$year:"$date"}
          },
          totalPrice:{$sum:"$totalPrice"}
        }
      },
      {
        $project:{
          _id:0,
          month:"$_id.month",
          year:"$_id.year",
          totalPrice:1
        }
      },
      {
        $sort:{
          year:1,
          month:1
        }
      }
    ])
    console.log('result',result);
    
    return result
  }

}

export default parlourRepository;
