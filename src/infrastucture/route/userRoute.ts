import userController from "../../adaptors/userController";
import userRepository from "../repository/userRepository";
import Userusecase from "../../use_case/userUseCase";
import express from "express"
import otpGen from "../utils/otpGen";
import sendOtp from "../utils/sendMail";
import Encrypt from "../utils/hashPassword";
import JWTtokensClass from "../utils/JWTtokens";



const repository = new userRepository()
const otp = new otpGen()
const otpSend = new sendOtp()
const encrypt= new Encrypt()
const jwtTokens = new JWTtokensClass();


const useCase = new Userusecase(repository,otpSend,otp,encrypt,jwtTokens)
const controller = new userController(useCase)


const router = express.Router()

router.post('/api/user/signup',(req,res)=>controller.verifyEmail(req,res))
router.post('/api/user/verifyotp',(req,res)=>controller.verifyOtp(req,res))
router.post('/api/user/login',(req,res)=>controller.logIn(req,res))

export default router