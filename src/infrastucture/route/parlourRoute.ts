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
router.get('/getParlourDetails',protect,(req,res)=>controller.getParlour(req,res))
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




// router.get('/services',protect,(req,res)=>servicecontroller.getServices(req,res))

router.post('/addService',protect,multerMid.single('image'),(req,res)=>servicecontroller.addService(req,res))
router.get('/categoriesToShow',protect,(req,res)=>servicecontroller.categoriesToShow(req,res))
// router.post('/editService',protect,(req,res)=>servicecontroller.editService(req,res))
// router.post('/listService',protect,(req,res)=>servicecontroller.listService(req,res))







export default router


