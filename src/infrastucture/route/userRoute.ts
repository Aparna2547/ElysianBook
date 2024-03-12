import userController from "../../adaptors/Controllers/userController";;
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

router.post('/verifymail',(req,res)=>controller.verifyEmail(req,res))
router.post('/signup',(req,res)=>controller.verifyOtp(req,res))
router.post('/gsignup',(req,res)=>controller.gsignup(req,res))
router.post('/login',(req,res)=>controller.logIn(req,res))
router.post('/forgotpassword',(req,res)=>controller.forgotPasswordEmail(req,res))
router.post('/verifyOtpForgotPassword',(req,res)=>controller.verifyOtpForgotPassword(req,res))
router.post('/passwordChange',(req,res)=>controller.passwordChange(req,res))
router.post('/logout',(req,res)=>controller.logout(req,res))

//palour show
router.get('/allParlours',(req,res)=>controller.parloursToShow(req,res))
router.get('/parlourDetails/:id',(req,res)=>controller.singleParlourDetails(req,res))
export default router