import parlourController from "../../adaptors/Controllers/parlourController"
import parlourRepository from "../repository/parlourRepository"
import ParlourUseCase from "../../use_case/parlourUseCase"
import express from "express"
import otpGen from "../utils/otpGen"
import sendOtp from "../utils/sendMail"
import Encrypt from "../utils/hashPassword"
import JWTtokensClass from "../utils/JWTtokens"
import { multerMid } from "../middleware/multerMiddleware"
import CloudinaryUtil from "../utils/cloudinary"
import { protect } from "../middleware/vendorAuth"



const repository = new parlourRepository()
const otp =  new otpGen()
const otpSend = new sendOtp()
const encrypt = new Encrypt()
const JWTtokens = new JWTtokensClass
const Cloudinary = new CloudinaryUtil()


const usecase = new ParlourUseCase(repository,otp,otpSend,encrypt,JWTtokens,Cloudinary)
const controller = new parlourController(usecase)

const router  = express.Router()

router.post('/signup',(req,res)=>controller.verifyEmail(req,res))
router.post('/verifyOtp',(req,res)=>controller.verifyOtp(req,res))
router.post('/gsignup',(req,res)=>controller.gsignup(req,res))
router.post('/login',(req,res)=>controller.vendorLogin(req,res))
router.post('/parlourforgotPassword',(req,res)=>controller.vendorForgotPassword(req,res))
router.post('/parlourVerifyOtpForgotPassword',(req,res)=>controller.vendorVerifyOtpForgotPassword(req,res))
router.post('/vendorPasswordChange',(req,res)=>controller.vendorPasswordChange(req,res))


router.post('/addParlour',protect,multerMid.array('banners',3),(req,res)=>controller.addParlour(req,res))
router.put('/editParlour',protect,multerMid.array('banners',3),(req,res)=>controller.editParlour(req,res))
router.get('/getParlourDetails',protect,(req,res)=>controller.getParlour(req,res));
router.get('/vendorProfile',(req,res)=>controller.vendorProfile(req,res))
router.put('/editVendorName',protect,(req,res)=>controller.editVendorName(req,res))
router.put('/editVendorPassword',protect,(req,res)=>controller.editVendorPassword(req,res))
router.put('/editVendorEmail',protect,(req,res)=>controller.editVendorEmail(req,res))
router.put('/editVendorEmailOtp',protect,(req,res) =>controller.editVendorEmailOtp(req,res))


//dashboard
router.get('/dashboardDetails',protect,(req,res)=>controller.dashboardDetails(req,res))
router.get('/monthlyProfit',protect,(req,res)=>controller.getMonthlyCompletedBooking(req,res))

router.post('/vendorLogout',(req,res)=>controller.vendorLogout(req,res))


//-------------------------------------------------------SERVICES-----------------------------------------------------
import serviceController from "../../adaptors/Controllers/serviceController"
import serviceRepository from "../repository/serviceRepository"
import serviceUsecase from "../../use_case/serviceUseCase"
import CloudinaryService from "../utils/cloudinary"


const servicerepository = new serviceRepository()
const cloudinary = new CloudinaryService()
const serviceusecase = new serviceUsecase(servicerepository,cloudinary);
const servicecontroller = new serviceController(serviceusecase)




router.get('/allServices',protect,(req,res)=>servicecontroller.showAllServices(req,res))
router.post('/addService',protect,multerMid.single('image'),(req,res)=>servicecontroller.addService(req,res))
router.get('/categoriesToShow',protect,(req,res)=>servicecontroller.categoriesToShow(req,res))
router.put('/editService',protect,multerMid.single('image'),(req,res)=>servicecontroller.editService(req,res))
router.put('/listService',protect,(req,res)=>servicecontroller.listService(req,res))



// ----------------------------------------------------------------------------------------
import bookingController from "../../adaptors/Controllers/bookingController";
import bookingUsecase from "../../use_case/bookingUseCase";
import bookingRepository from "../repository/bookingRepository";
import StripePayment from "../utils/stripe";
import SlotChecking from "../utils/SlotChecking";


const bookingrepository = new bookingRepository()
const stripePayment = new StripePayment()
const slotChecking = new SlotChecking()
const bookingusecase = new bookingUsecase(bookingrepository,stripePayment,slotChecking)
const bookingcontroller = new bookingController(bookingusecase)


router.get('/allBookings',protect,(req,res)=>bookingcontroller.allBookings(req,res))


export default router


