import userController from "../../adaptors/Controllers/userController";;
import userRepository from "../repository/userRepository";
import Userusecase from "../../use_case/userUseCase";
import express from "express"
import otpGen from "../utils/otpGen";
import sendOtp from "../utils/sendMail";
import Encrypt from "../utils/hashPassword";
import JWTtokensClass from "../utils/JWTtokens";
import { protect } from "../middleware/userAuth";
import Cloudinary from "../utils/cloudinary";



const repository = new userRepository()
const otp = new otpGen()
const otpSend = new sendOtp()
const encrypt= new Encrypt()
const jwtTokens = new JWTtokensClass();
const cloudinary = new Cloudinary()

const useCase = new Userusecase(repository,otpSend,otp,encrypt,jwtTokens,cloudinary)
const controller = new userController(useCase)


const router = express.Router()

router.post('/verifymail',(req,res)=>controller.verifyEmail(req,res))
router.post('/signup',(req,res)=>controller.verifyOtp(req,res))
router.post('/resendotp',(req,res)=>controller.resendOtp(req,res))  
router.post('/gsignup',(req,res)=>controller.gsignup(req,res))
router.post('/login',(req,res)=>controller.logIn(req,res))
router.post('/forgotpassword',(req,res)=>controller.forgotPasswordEmail(req,res))
router.post('/verifyOtpForgotPassword',(req,res)=>controller.verifyOtpForgotPassword(req,res))
router.post('/passwordChange',(req,res)=>controller.passwordChange(req,res))
router.post('/logout',(req,res)=>controller.logout(req,res))

//profile
router.get('/profile',protect,(req,res)=>controller.userProfile(req,res))
router.put('/changeUserName',protect,(req,res)=>controller.changeUserName(req,res))
router.put('/changeUserPassword',protect,(req,res)=>controller.changeUserPassword(req,res))
router.put('/changeUserEmail',protect,(req,res)=>controller.changeUserEmail(req,res))
router.put('/changeUserEmailSave',protect,(req,res)=>controller.changeUserEmailSave(req,res))
router.put('/deleteProfilePicture',protect,(req,res)=>controller.deleteProfilePicture(req,res))
router.put('/changeProfilePicture' , protect,(req,res)=>controller.changeProfilePicture(req,res))


//palour show
router.get('/allParlours',(req,res)=>controller.parloursToShow(req,res))
router.get('/parlourDetails/:id',protect,(req,res)=>controller.singleParlourDetails(req,res))


// ---------------------------------------------------------------------------------------------------

//services
import serviceController from "../../adaptors/Controllers/serviceController"
import serviceRepository from "../repository/serviceRepository"
import serviceUsecase from "../../use_case/serviceUseCase"


const servicerepository = new serviceRepository()
const serviceusecase = new serviceUsecase(servicerepository,cloudinary);
const servicecontroller = new serviceController(serviceusecase)


router.get('/getServices',(req,res)=>servicecontroller.getServicesInUser(req,res))

// ---------------------------------------------bookings-----------------------------------------------------------
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

//taking detaiks
router.post('/proceedForPayment',protect,(req,res)=>bookingcontroller.proceedForPayment(req,res))
router.post('/confirmBooking',(req,res)=>bookingcontroller.confirmBooking(req,res))
router.get('/allUserBooking',protect,(req,res)=>bookingcontroller.allUserBooking(req,res))
router.post('/cancelBooking',protect,(req,res)=>bookingcontroller.cancelBooking(req,res))

//showing slotes
router.get('/bookedSlots',(req,res)=>bookingcontroller.bookedSlots(req,res))


// ---------------------------------------------------------------------------------------


export default router