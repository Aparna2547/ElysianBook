import nodemailer from 'nodemailer'
import nodeMailer from '../../use_case/interface/nodemailerInterface'
import dotenv from 'dotenv'
dotenv.config()
class sendOtp{
    private transporter : nodemailer.Transporter;
    constructor(){
        this.transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'aparnapie.2547@gmail.com',
                pass: process.env.EMAIL_PASS,
            },
        })
    }

  
}

export default sendOtp