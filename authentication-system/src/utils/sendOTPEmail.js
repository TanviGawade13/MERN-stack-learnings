const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASS
    }
})

const sendOTPEmail = async (email,otp)=>{
    try{
        await transporter.sendMail({
            from: `"AUTH SYSTEM" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "OTP for auth system" ,
            html: `<h2>Your OTP is ${otp}</h2>`,
        })
    }catch(err){
        throw new Error("Failed to send OTP email");
    }
}


module.exports = sendOTPEmail