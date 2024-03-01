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


router.post('/addParlour',multerMid.array('banners',3),(req,res)=>controller.addParlour(req,res))
router.get('/getParlourDetails',(req,res)=>controller.getParlour(req,res))
router.post('/vendorLogout',(req,res)=>controller.vendorLogout(req,res))
export default router


