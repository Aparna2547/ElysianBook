"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parlourController_1 = __importDefault(require("../../adaptors/Controllers/parlourController"));
const parlourRepository_1 = __importDefault(require("../repository/parlourRepository"));
const parlourUseCase_1 = __importDefault(require("../../use_case/parlourUseCase"));
const express_1 = __importDefault(require("express"));
const otpGen_1 = __importDefault(require("../utils/otpGen"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const hashPassword_1 = __importDefault(require("../utils/hashPassword"));
const JWTtokens_1 = __importDefault(require("../utils/JWTtokens"));
const multerMiddleware_1 = require("../middleware/multerMiddleware");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const vendorAuth_1 = require("../middleware/vendorAuth");
const repository = new parlourRepository_1.default();
const otp = new otpGen_1.default();
const otpSend = new sendMail_1.default();
const encrypt = new hashPassword_1.default();
const JWTtokens = new JWTtokens_1.default;
const Cloudinary = new cloudinary_1.default();
const usecase = new parlourUseCase_1.default(repository, otp, otpSend, encrypt, JWTtokens, Cloudinary);
const controller = new parlourController_1.default(usecase);
const router = express_1.default.Router();
router.post('/signup', (req, res) => controller.verifyEmail(req, res));
router.post('/verifyOtp', (req, res) => controller.verifyOtp(req, res));
router.post('/gsignup', (req, res) => controller.gsignup(req, res));
router.post('/login', (req, res) => controller.vendorLogin(req, res));
router.post('/parlourforgotPassword', (req, res) => controller.vendorForgotPassword(req, res));
router.post('/parlourVerifyOtpForgotPassword', (req, res) => controller.vendorVerifyOtpForgotPassword(req, res));
router.post('/vendorPasswordChange', (req, res) => controller.vendorPasswordChange(req, res));
router.post('/addParlour', vendorAuth_1.protect, multerMiddleware_1.multerMid.array('banners', 3), (req, res) => controller.addParlour(req, res));
router.put('/editParlour', vendorAuth_1.protect, multerMiddleware_1.multerMid.array('banners', 3), (req, res) => controller.editParlour(req, res));
router.get('/getParlourDetails', vendorAuth_1.protect, (req, res) => controller.getParlour(req, res));
router.get('/vendorProfile', (req, res) => controller.vendorProfile(req, res));
router.put('/editVendorName', vendorAuth_1.protect, (req, res) => controller.editVendorName(req, res));
router.put('/editVendorPassword', vendorAuth_1.protect, (req, res) => controller.editVendorPassword(req, res));
router.put('/editVendorEmail', vendorAuth_1.protect, (req, res) => controller.editVendorEmail(req, res));
router.put('/editVendorEmailOtp', vendorAuth_1.protect, (req, res) => controller.editVendorEmailOtp(req, res));
//dashboard
router.get('/dashboardDetails', vendorAuth_1.protect, (req, res) => controller.dashboardDetails(req, res));
router.get('/monthlyProfit', vendorAuth_1.protect, (req, res) => controller.getMonthlyCompletedBooking(req, res));
// router.get('/revenueAndRefund',protect,(req,res)=>controller.revenueAndRefund(req,res))
//holidays
router.post('/addHolidays', vendorAuth_1.protect, (req, res) => controller.addHolidays(req, res));
router.post('/vendorLogout', (req, res) => controller.vendorLogout(req, res));
//-------------------------------------------------------SERVICES-----------------------------------------------------
const serviceController_1 = __importDefault(require("../../adaptors/Controllers/serviceController"));
const serviceRepository_1 = __importDefault(require("../repository/serviceRepository"));
const serviceUseCase_1 = __importDefault(require("../../use_case/serviceUseCase"));
const cloudinary_2 = __importDefault(require("../utils/cloudinary"));
const servicerepository = new serviceRepository_1.default();
const cloudinary = new cloudinary_2.default();
const serviceusecase = new serviceUseCase_1.default(servicerepository, cloudinary);
const servicecontroller = new serviceController_1.default(serviceusecase);
router.get('/allServices', vendorAuth_1.protect, (req, res) => servicecontroller.showAllServices(req, res));
router.post('/addService', vendorAuth_1.protect, multerMiddleware_1.multerMid.single('image'), (req, res) => servicecontroller.addService(req, res));
router.get('/categoriesToShow', vendorAuth_1.protect, (req, res) => servicecontroller.categoriesToShow(req, res));
router.put('/editService', vendorAuth_1.protect, multerMiddleware_1.multerMid.single('image'), (req, res) => servicecontroller.editService(req, res));
router.put('/listService', vendorAuth_1.protect, (req, res) => servicecontroller.listService(req, res));
// ----------------------------------------------------------------------------------------
const bookingController_1 = __importDefault(require("../../adaptors/Controllers/bookingController"));
const bookingUseCase_1 = __importDefault(require("../../use_case/bookingUseCase"));
const bookingRepository_1 = __importDefault(require("../repository/bookingRepository"));
const stripe_1 = __importDefault(require("../utils/stripe"));
const SlotChecking_1 = __importDefault(require("../utils/SlotChecking"));
const scheduleBooking_1 = __importDefault(require("../utils/scheduleBooking"));
const bookingrepository = new bookingRepository_1.default();
const stripePayment = new stripe_1.default();
const slotChecking = new SlotChecking_1.default();
const schedulebooking = new scheduleBooking_1.default();
const bookingusecase = new bookingUseCase_1.default(bookingrepository, stripePayment, slotChecking, schedulebooking);
const bookingcontroller = new bookingController_1.default(bookingusecase);
router.get('/allBookings', vendorAuth_1.protect, (req, res) => bookingcontroller.allBookings(req, res));
router.post('/cancelledByParlour', vendorAuth_1.protect, (req, res) => bookingcontroller.cancelledByParlour(req, res));
exports.default = router;