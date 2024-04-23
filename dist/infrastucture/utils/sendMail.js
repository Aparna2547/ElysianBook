"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class sendOtp {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: 'aparnapie.2547@gmail.com',
                pass: process.env.EMAIL_PASS,
            },
        });
    }
    sendMail(name, email, verif_code) {
        const mailOptions = {
            from: 'aparnapie.2547@gmail.com',
            to: email,
            subject: 'ElysianBook Email Verification',
            text: `${email},your verification code is: ${verif_code}`
        };
        this.transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('verification code sent successfully');
            }
        });
    }
    forgotSendMail(email, verif_code) {
        const mailOptions = {
            from: 'aparnapie.2547@gmail.com',
            to: email,
            subject: 'ElysianBook Email Verification',
            text: `${email},your verification code is: ${verif_code}`
        };
        this.transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('verification code sent successfully');
            }
        });
    }
}
exports.default = sendOtp;
