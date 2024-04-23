import adminController from "../../adaptors/Controllers/adminController"; 
import adminRepository from "../repository/adminRepository";
import Adminusecase from "../../use_case/adminUseCase";
import express from "express";
import JWTtokens from "../utils/JWTtokens";
import Encrypt from "../utils/hashPassword";
import { multerMid } from "../middleware/multerMiddleware";
import { protect } from "../middleware/adminAuth";

const repository = new adminRepository()
const encrypt = new Encrypt();
const jwttokens = new JWTtokens()
const usecase = new Adminusecase(repository,encrypt,jwttokens)
const controller = new adminController(usecase)


const router = express.Router()

router.post('/login',(req,res)=>controller.verifyEmail(req,res))
router.get('/users',protect,(req,res)=>controller.getUsers(req,res))
router.put('/userblock',protect,(req,res)=>controller.blockUser(req,res))
// router.get('/vendors',protect,(req,res)=>controller.getVendors(req,res))
router.put('/blockVendor',protect,(req,res)=>controller.blockVendor(req,res))
router.get('/parlours',protect,(req,res)=>controller.getParlours(req,res))
router.get('/singleParlour',protect,(req,res)=>controller.singleParlourDetails(req,res))
router.post('/parlourRequestConfirmation',protect,(req,res)=>controller.parlourRequestConfirmation(req,res))



//admin dashboard
router.get('/totalDetails',protect,(req,res)=>controller.totalDetails(req,res))
router.get('/monthlyData',protect,(req,res)=>controller.monthlyData(req,res))


router.post('/adminlogout',(req,res)=>controller.adminLogout(req,res))


// --------------------------------------------------------------------------------------



//..............................................................................................

//category
import categoryController from "../../adaptors/Controllers/categoryController";
import categoryRepository from "../repository/categoryRepository";
import categoryusecase from "../../use_case/categoryUseCase"
import Cloudinary from "../utils/cloudinary";


const catrepository = new categoryRepository()
const cloudinary = new Cloudinary()
const catusecase = new categoryusecase(catrepository,cloudinary)
const catcontroller = new categoryController(catusecase)


router.get('/category',protect,(req,res)=>catcontroller.getCategory(req,res))
router.post('/addcategory',protect,multerMid.single('image'),(req,res)=>catcontroller.addCategory(req,res))
router.put('/editcategory',protect,multerMid.single('image'),(req,res)=>catcontroller.editCategory(req,res))
router.put('/hidecategory',protect,(req,res)=>catcontroller.hideCategory(req,res))

// -------------------------------------------------------------------------------------------------------------------------------

//admin utils such as banners facilities

import adminUtilsController from "../../adaptors/Controllers/adminUtilsController"
import adminUtilsRepository from "../repository/adminUtilsRepository"
import adminUtilsUseCase from "../../use_case/adminUtilsUseCase"
// import Cloudinary from "../utils/cloudinary";


const utilsrepository = new adminUtilsRepository()
const utilsCloudinary = new Cloudinary()
const utilsusecase = new adminUtilsUseCase(utilsrepository,utilsCloudinary)
const utilscontroller = new adminUtilsController(utilsusecase)

router.get('/facilities',protect,(req,res)=>utilscontroller.getFacilites(req,res))
router.post('/addFacility',protect,(req,res)=>utilscontroller.addFacility(req,res))


router.post('/addBanner',protect,multerMid.array('image',3),(req,res)=>utilscontroller.addBanner(req,res))
router.get('/getBanners',(req,res)=>utilscontroller.getBanners(req,res))
router.put('/deleteBanner',protect,(req,res)=>utilscontroller.deleteBanner(req,res))

export default router


//-------------------------------------------------------------------------------------------
