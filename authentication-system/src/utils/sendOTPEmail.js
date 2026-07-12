const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.GMAIL_SENDER,
        password: process.env.PASSWORD
    }
})

export const sendOTPEmail = (email,otp)=>{
    try{
        await transporter.sendMail({
            from: AUTH SYSTEM
        })
    }catch(err){

    }
}