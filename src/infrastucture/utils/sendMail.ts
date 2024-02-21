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

    sendMail(name:string, email:string, verif_code:string):void{        
        const mailOptions :nodemailer.SendMailOptions = {
                from: 'aparnapie.2547@gmail.com',
                to:email,
                subject:'ElysianBook Email Verification',
                text: `${email},your verification code is: ${verif_code}`
        }
        this.transporter.sendMail(mailOptions,(err)=>{
            if (err){
                console.log(err);
                
            }else{
                console.log('verification code sent successfully');
            }
        })
    }

    
    forgotSendMail(email:string, verif_code:string):void{        
        const mailOptions :nodemailer.SendMailOptions = {
                from: 'aparnapie.2547@gmail.com',
                to:email,
                subject:'ElysianBook Email Verification',
                text: `${email},your verification code is: ${verif_code}`
        }
        this.transporter.sendMail(mailOptions,(err)=>{
            if (err){
                console.log(err);
                
            }else{
                console.log('verification code sent successfully');
            }
        })
    }
}

export default sendOtp