"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("../../adaptors/Controllers/userController"));
;
const userRepository_1 = __importDefault(require("../repository/userRepository"));
const userUseCase_1 = __importDefault(require("../../use_case/userUseCase"));
const express_1 = __importDefault(require("express"));
const otpGen_1 = __importDefault(require("../utils/otpGen"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const hashPassword_1 = __importDefault(require("../utils/hashPassword"));
const JWTtokens_1 = __importDefault(require("../utils/JWTtokens"));
const userAuth_1 = require("../middleware/userAuth");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const repository = new userRepository_1.default();
const otp = new otpGen_1.default();
const otpSend = new sendMail_1.default();
const encrypt = new hashPassword_1.default();
const jwtTokens = new JWTtokens_1.default();
const cloudinary = new cloudinary_1.default();
const useCase = new userUseCase_1.default(repository, otpSend, otp, encrypt, jwtTokens, cloudinary);
const controller = new userController_1.default(useCase);
const router = express_1.default.Router();
router.post('/verifymail', (req, res) => controller.verifyEmail(req, res));
router.post('/signup', (req, res) => controller.verifyOtp(req, res));
router.post('/resendotp', (req, res) => controller.resendOtp(req, res));
router.post('/gsignup', (req, res) => controller.gsignup(req, res));
router.post('/login', (req, res) => controller.logIn(req, res));
router.post('/forgotpassword', (req, res) => controller.forgotPasswordEmail(req, res));
router.post('/verifyOtpForgotPassword', (req, res) => controller.verifyOtpForgotPassword(req, res));
router.post('/passwordChange', (req, res) => controller.passwordChange(req, res));
router.post('/logout', (req, res) => controller.logout(req, res));
//profile
router.get('/profile', userAuth_1.protect, (req, res) => controller.userProfile(req, res));
router.put('/changeUserName', userAuth_1.protect, (req, res) => controller.changeUserName(req, res));
router.put('/changeUserPassword', userAuth_1.protect, (req, res) => controller.changeUserPassword(req, res));
router.put('/changeUserEmail', userAuth_1.protect, (req, res) => controller.changeUserEmail(req, res));
router.put('/changeUserEmailSave', userAuth_1.protect, (req, res) => controller.changeUserEmailSave(req, res));
router.put('/deleteProfilePicture', userAuth_1.protect, (req, res) => controller.deleteProfilePicture(req, res));
router.put('/changeProfilePicture', userAuth_1.protect, (req, res) => controller.changeProfilePicture(req, res));
//palour show
router.get('/allParlours', (req, res) => controller.parloursToShow(req, res));
router.get('/parlourDetails/:id', (req, res) => controller.singleParlourDetails(req, res));
router.get('/allcategories', (req, res) => controller.getAllCategories(req, res));
// ---------------------------------------------------------------------------------------------------
//services
const serviceController_1 = __importDefault(require("../../adaptors/Controllers/serviceController"));
const serviceRepository_1 = __importDefault(require("../repository/serviceRepository"));
const serviceUseCase_1 = __importDefault(require("../../use_case/serviceUseCase"));
const servicerepository = new serviceRepository_1.default();
const serviceusecase = new serviceUseCase_1.default(servicerepository, cloudinary);
const servicecontroller = new serviceController_1.default(serviceusecase);
router.get('/getServices', (req, res) => servicecontroller.getServicesInUser(req, res));
// ---------------------------------------------bookings-----------------------------------------------------------
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
//taking detaiks
router.post('/proceedForPayment', userAuth_1.protect, (req, res) => bookingcontroller.proceedForPayment(req, res));
router.post('/confirmBooking', (req, res) => bookingcontroller.confirmBooking(req, res));
router.get('/allUserBooking', userAuth_1.protect, (req, res) => bookingcontroller.allUserBooking(req, res));
router.post('/cancelBooking', userAuth_1.protect, (req, res) => bookingcontroller.cancelBooking(req, res));
//showing slotes
router.get('/bookedSlots', (req, res) => bookingcontroller.bookedSlots(req, res));
router.get('/getHolidays', (req, res) => bookingcontroller.getHolidays(req, res));
// ---------------------------------------------------------------------------------------
exports.default = router;
