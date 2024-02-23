import adminController from "../../adaptors/adminController";
import adminRepository from "../repository/adminRepository";
import Adminusecase from "../../use_case/adminUseCase";
import express from "express";
import JWTtokens from "../utils/JWTtokens";
import Encrypt from "../utils/hashPassword";
import { multerMid } from "../middleware/multerMiddleware";

const repository = new adminRepository()
const encrypt = new Encrypt();
const jwttokens = new JWTtokens()
const usecase = new Adminusecase(repository,encrypt,jwttokens)
const controller = new adminController(usecase)


const router = express.Router()

router.post('/login',(req,res)=>controller.verifyEmail(req,res))
router.get('/users',(req,res)=>controller.getUsers(req,res))
router.put('/userblock',(req,res)=>controller.blockUser(req,res))
router.get('/vendors',(req,res)=>controller.getVendors(req,res))
router.put('/blockVendor',(req,res)=>controller.blockVendor(req,res))
router.post('/adminlogout',(req,res)=>controller.adminLogout(req,res))


// --------------------------------------------------------------------------------------


//category
import categoryController from "../../adaptors/categoryController"
import categoryRepository from "../repository/categoryRepository";
import categoryusecase from "../../use_case/categoryUseCase"
import Cloudinary from "../utils/cloudinary";


const catrepository = new categoryRepository()
const cloudinary = new Cloudinary()
const catusecase = new categoryusecase(catrepository,cloudinary)
const catcontroller = new categoryController(catusecase)


router.get('/category',(req,res)=>catcontroller.getCategory(req,res))
router.post('/addcategory',multerMid.single('image'),(req,res)=>catcontroller.addCategory(req,res))
router.put('/editcategory',multerMid.single('image'),(req,res)=>catcontroller.editCategory(req,res))
router.put('/hidecategory',(req,res)=>catcontroller.hideCategory(req,res))











export default router