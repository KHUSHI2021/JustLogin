import nodemailer from 'nodemailer'
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs'
//import { sendEmail } from '@/helpers/mailer';

export const sendEmail=async({email,eamilType,userId}:any)=>
    {
      try{

       const hashedToken= await bcryptjs.hash(userId.toString(),10)
        if(eamilType==="VERIFY"){
            await User.findByIdAndUpdate(userId,{verifyToken:hashedToken,verifyTokenEpiry:Date.now()+3600000}
        )
        } else if(eamilType==="RESET"){
            await User.findByIdAndUpdate(userId,{forgetPasswordToken:hashedToken,forgetPasswordTokenExpiry:Date.now()+3600000})
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "77e339a194715d", // not need here
              pass: "0f8d27f8a0d303" //"
            }
          });

          const mailOptions={
            from:'khushi.gupta110203@gmail.com',
            to : email,
            subject:eamilType==='VERIFY'?"Verify your email":"Reset your password",
            html:'<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"> here </a> to ${emailType==="VERIFY" ? "verify your email":"reset your password"} or copy and paste the link below in your browser. <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p> ',
            }

       const mailResponse= await transport.sendMail(mailOptions)
       return mailResponse
      }
      catch(error:any){
           throw new error(error.message)
      }
    }