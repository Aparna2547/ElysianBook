"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminController_1 = __importDefault(require("../../adaptors/Controllers/adminController"));
const adminRepository_1 = __importDefault(require("../repository/adminRepository"));
const adminUseCase_1 = __importDefault(require("../../use_case/adminUseCase"));
const express_1 = __importDefault(require("express"));
const JWTtokens_1 = __importDefault(require("../utils/JWTtokens"));
const hashPassword_1 = __importDefault(require("../utils/hashPassword"));
const multerMiddleware_1 = require("../middleware/multerMiddleware");
const adminAuth_1 = require("../middleware/adminAuth");
const repository = new adminRepository_1.default();
const encrypt = new hashPassword_1.default();
const jwttokens = new JWTtokens_1.default();
const usecase = new adminUseCase_1.default(repository, encrypt, jwttokens);
const controller = new adminController_1.default(usecase);
const router = express_1.default.Router();
router.post('/login', (req, res) => controller.verifyEmail(req, res));
router.get('/users', adminAuth_1.protect, (req, res) => controller.getUsers(req, res));
router.put('/userblock', adminAuth_1.protect, (req, res) => controller.blockUser(req, res));
// router.get('/vendors',protect,(req,res)=>controller.getVendors(req,res))
router.put('/blockVendor', adminAuth_1.protect, (req, res) => controller.blockVendor(req, res));
router.get('/parlours', adminAuth_1.protect, (req, res) => controller.getParlours(req, res));
router.get('/singleParlour', adminAuth_1.protect, (req, res) => controller.singleParlourDetails(req, res));
router.post('/parlourRequestConfirmation', adminAuth_1.protect, (req, res) => controller.parlourRequestConfirmation(req, res));
//admin dashboard
router.get('/totalDetails', adminAuth_1.protect, (req, res) => controller.totalDetails(req, res));
router.get('/monthlyData', adminAuth_1.protect, (req, res) => controller.monthlyData(req, res));
router.post('/adminlogout', (req, res) => controller.adminLogout(req, res));
// --------------------------------------------------------------------------------------
//..............................................................................................
//category
const categoryController_1 = __importDefault(require("../../adaptors/Controllers/categoryController"));
const categoryRepository_1 = __importDefault(require("../repository/categoryRepository"));
const categoryUseCase_1 = __importDefault(require("../../use_case/categoryUseCase"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const catrepository = new categoryRepository_1.default();
const cloudinary = new cloudinary_1.default();
const catusecase = new categoryUseCase_1.default(catrepository, cloudinary);
const catcontroller = new categoryController_1.default(catusecase);
router.get('/category', adminAuth_1.protect, (req, res) => catcontroller.getCategory(req, res));
router.post('/addcategory', adminAuth_1.protect, multerMiddleware_1.multerMid.single('image'), (req, res) => catcontroller.addCategory(req, res));
router.put('/editcategory', adminAuth_1.protect, multerMiddleware_1.multerMid.single('image'), (req, res) => catcontroller.editCategory(req, res));
router.put('/hidecategory', adminAuth_1.protect, (req, res) => catcontroller.hideCategory(req, res));
// -------------------------------------------------------------------------------------------------------------------------------
//admin utils such as banners facilities
const adminUtilsController_1 = __importDefault(require("../../adaptors/Controllers/adminUtilsController"));
const adminUtilsRepository_1 = __importDefault(require("../repository/adminUtilsRepository"));
const adminUtilsUseCase_1 = __importDefault(require("../../use_case/adminUtilsUseCase"));
// import Cloudinary from "../utils/cloudinary";
const utilsrepository = new adminUtilsRepository_1.default();
const utilsCloudinary = new cloudinary_1.default();
const utilsusecase = new adminUtilsUseCase_1.default(utilsrepository, utilsCloudinary);
const utilscontroller = new adminUtilsController_1.default(utilsusecase);
router.get('/facilities', adminAuth_1.protect, (req, res) => utilscontroller.getFacilites(req, res));
router.post('/addFacility', adminAuth_1.protect, (req, res) => utilscontroller.addFacility(req, res));
router.post('/addBanner', adminAuth_1.protect, multerMiddleware_1.multerMid.array('image', 3), (req, res) => utilscontroller.addBanner(req, res));
router.get('/getBanners', (req, res) => utilscontroller.getBanners(req, res));
router.put('/deleteBanner', adminAuth_1.protect, (req, res) => utilscontroller.deleteBanner(req, res));
exports.default = router;
//-------------------------------------------------------------------------------------------
