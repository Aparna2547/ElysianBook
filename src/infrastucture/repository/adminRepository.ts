import Admin from "../../domain_entites/admin";
import { adminModel } from "../database/adminModel";
import IAdminRepository from "../../use_case/interface/adminInterface";
import { UserModel } from "../database/userModel";
import { ParlourModel } from "../database/ParlourModel";
import { BookingModel } from "../database/bookingModel";

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
  async getUser(search:string,page:number) {
    try {
      console.log("alll users");
      // const showUser = await UserModel.find();
      const limit = 4
      let skip = (page - 1)* limit;
      let totalUsers = await UserModel.find({}).countDocuments();
      let totalPages = Math.floor(totalUsers/limit)

      const showUser = await UserModel.find({
        $or: [
          {name : {$regex : '^' + search, $options: "i" } },
          {email: {$regex : '^' + search, $options : "i"}}
        ]
      }).skip(skip).limit(limit);
      console.log(showUser)
      return {showUser,totalPages};
    } catch (error) {
      console.log(error);
    }
  }

  //block user
  async blockUser(id: string) {
    console.log(id);
    console.log("block user");
    const user = await UserModel.findById(id);
    // user.isBlocked = !user?.isBlocked
    // await user.save()
    // console.log(user);
    // if (user) {
    //   let userStatus;
    //   if (user.isBlocked === false) {
    //     console.log("user is unblocked");
    //     userStatus = await UserModel.updateOne(
    //       { _id: id },
    //       { $set: { isBlocked: true } }
    //     );
    //   } else {
    //     userStatus = await UserModel.updateOne(
    //       { _id: id },
    //       { $set: { isBlocked: false } }
    //     );
    //   }
    //   return userStatus;
    // } else {
    //   return null;
    // }
    // return user


    if(user){
      user.isBlocked = !user.isBlocked
      await user.save();
      console.log((user));
      
    }
  }

  //list all vendors
  async getParlours(search:string,page:number) {
    console.log("all vendors-usecase");
    // const showVendors = await ParlourModel.find();

    const limit = 4;
    let skip = (page - 1)* limit;
    let totalParlours = await ParlourModel.find({}).countDocuments()
    let totalPages = Math.floor(totalParlours/limit);

    const showVendors = await ParlourModel.find({
      $or:[
        {name: {$regex : '^' + search ,$options:"i"}},
        {email: {$regex : '^' + search ,$options:"i"}}
      ]
    }).skip(skip).limit(limit);UserModel
    console.log('parlours',showVendors);
    
    return {showVendors,totalPages};
  }

  //block vendor
  async blockVendor(id: string) {
    console.log("inside repo");
    const vendor = await ParlourModel.findById(id);
    // if (vendorDetails) {
    //   let vendorStatus;
    //   if (vendorDetails.isBlocked === false) {
    //     console.log("vendor is unblocked");
    //     vendorStatus = await ParlourModel.updateOne(
    //       { _id: id },
    //       { $set: { isBlocked: true } }
    //     );
    //   } else {
    //     vendorStatus = await ParlourModel.updateOne(
    //       { _id: id },
    //       { $set: { isBlocked: false } }
    //     );
    //   }
    //   return vendorStatus;
    // } else {
    //   return null;
    // }

    if(vendor){
      vendor.isBlocked = !vendor.isBlocked
      await vendor.save();
      console.log(vendor);
      
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

  async totalDetails():Promise<any>{
    const allUsers = await UserModel.find({}).countDocuments()
    console.log('allusers',allUsers);

    const allParlours = await ParlourModel.find({}).countDocuments()
    console.log('asllparlour',allParlours);

    const parlour = await ParlourModel.find({status:'Active'}).countDocuments()
    console.log('active parlour',parlour)
    const regFee =  parlour*2000
    const bookings = await BookingModel.find().countDocuments()
    const bookFee = bookings * 50
    console.log('active parlour',bookings,bookFee)

    const revenue = regFee + bookFee
    console.log('revenue    ',revenue)

    return {allUsers,allParlours,revenue}
  }



  async  monthlyData(year:number) {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);
  
    const activeParlours = await ParlourModel.find({ status: "Active", date: { $gte: startDate, $lt: endDate } }).countDocuments();
    const regFee = activeParlours * 2000;
  
    const bookings = await BookingModel.find({ date: { $gte: startDate, $lt: endDate } }).countDocuments();
  
    console.log('Bookings:', bookings);
    const bookFee = bookings * 50;
  
    const revenue = regFee + bookFee;
    const profit = revenue - (activeParlours * 2000); 
  
    console.log('Revenue:', revenue);
    console.log('Profit:', profit);
  

    const res = await BookingModel.aggregate([
      {
        $match:{
          status:'completed',
          date:{$gte:startDate,$lt:endDate}
        }
      },{
        $group:{
          _id:{
            month:{$month:"$date"},
            year:{$year:"$date"}
          },
          totalPrice:{$sum:"$totalPrice"}
        }
      },{
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
    console.log('dfkd',res)
    return res;
  }
  
}
export default adminRepository;
