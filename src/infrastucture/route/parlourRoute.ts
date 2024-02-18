import parlourController from "../../adaptors/parlourController"
import parlourRepository from "../repository/parlourRepository"
import ParlourUseCase from "../../use_case/parlourUseCase"
import express from "express"
import otpGen from "../utils/otpGen"
import sendOtp from "../utils/sendMail"
import Encrypt from "../utils/hashPassword"
import JWTtokensClass from "../utils/JWTtokens"



const repository = new parlourRepository()
const otp =  new otpGen()
const otpSend = new sendOtp()
const encrypt = new Encrypt()
const JWTtokens = new JWTtokensClass
const usecase = new ParlourUseCase(repository,otp,otpSend,encrypt,JWTtokens)
const controller = new parlourController(usecase)

const router  = express.Router()

router.post('/api/parlours/signup',(req,res)=>controller.verifyEmail(req,res))
router.post('/api/parlours/verifyotp',(req,res)=>controller.verifyOtp(req,res))
router.post('/api/parlours/login',(req,res)=>controller.vendorLogin(req,res))

export default router
