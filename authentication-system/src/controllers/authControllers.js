const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const generateOtp = require('../utils/generateOtp')
const sendOTPEmail = require('../utils/sendOTPEmail')
const OTP_TIME = 10*60*1000;
const OTP_ATTEMPTS = 3;

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if(!username|| !email || !password){
            return res.status(400).json({
                message: "Username, Email and password should not be empty"
            })
        }

        const exists = await User.findOne({email: email})
        if(exists) return res.status(400).json({message: "User already exists"})


        const hashedPass = await bcrypt.hash(password,10)
        const rawOTP = generateOtp()
        const hashedOtp = await bcrypt.hash(rawOTP, 10)
        
        const user = await User.create({
            username,
            email,
            password: hashedPass,
            otp: hashedOtp,
            otpExpiry: new Date(Date.now() + OTP_TIME)
        })
        await sendOTPEmail(email, rawOTP)

        res.status(201).json({
            message: "User created successfully"
        })
    }catch(err){
        res.status(500).json({
            message: `Server error: ${err.message}`
        })
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        if(!user.isVerified) return res.status(400).json({message: "Please verify gmail first"})
        const password = req.body.password
        const dbPass = user.password

        const result = await bcrypt.compare(password , dbPass)
        if (result) {
            const accessToken = jwt.sign(
                {   userid: user._id    },
                process.env.ACCESS_SECRET_KEY,
                {   expiresIn : "15m"    }
            )
            const refreshToken = jwt.sign(
                {   userid: user._id ,  tokenVersion: user.tokenVersion   },
                process.env.REFRESH_SECRET_KEY,
                {   expiresIn : "7d"    }
            )
            res.cookie('refreshToken', refreshToken , {
                httpOnly: true
            });
            return res.status(200).json({     //json via data send karte hai taki data ek structured format mai frontend tak jaye
                message: "User logged in successfully",
                accessToken: accessToken
            })
        } else {
            return res.status(400).json({
                message: "Password was incorrect"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: `Server error: ${err.message}`
        })
    }
}

const getProfile = async(req,res) =>{
    try{
        const user = await User.findById(req.userId)
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
    
        res.json({
            message: "Accessed profile successfully"
        })
    }catch(err){
        res.status(500).json({
            message: `Server err: ${err.message}`
        })
    }
    

}

const refreshAccessToken = async(req,res)=>{
    const refreshToken = req.cookies.refreshToken
    console.log(refreshToken)
    if(!refreshToken){
        return res.status(404).json({
            message: "No refresh token provided"
        })
    }
    
    let decoded;  //let use kiya becoz const se sirf ek baar declare kiya jaa sakta hai 
    try{
        decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY)
    }catch(err){
        return res.status(401).json({
            message: "Invalid Token"
        })
    }

    //to check if user ne kahi aur logout all devices to nahi kara na 
    
    const user = await User.findById(decoded.userid)  //user chchiye kyuki hume access token banane ke liye user.id lagta hai
    //aur yeh bhi check karna padta hai ki woh user accesstoken request karte time avaiable hai db mai ya delete ho gaya 
    //because refresh token mai login ke time ka user.id diya tha aur uske baad acct delete bhi kiya ja sakta hai 
    if(!user){
        return res.status(404).json({ message: "User not found" })
    }
    if(decoded.tokenVersion != user.tokenVersion) return res.status(400).json({message: "Session revoked. Please login again"})

    const accessToken = jwt.sign(
    {   userid: user._id   },
    process.env.ACCESS_SECRET_KEY,
    {   expiresIn : "15m"    }
    )

    res.json({
        message: "Access Token refreshed",
        accessToken
    })
}

const logout = async(req,res)=>{
    res.clearCookie('refreshToken')
    res.json({message: "Logged out"})
}

const logoutAllDevices = async(req,res)=>{
    try{
        await User.findByIdAndUpdate(req.userId, { $inc: {tokenVersion: 1}})
        res.json({message: "Logged out from all devices"})
    }catch(err){
        res.status(500).json({ message: `Server error: ${err.message}` });
    }
}

const verifyOTP =async(req,res)=>{
    try{
        const {email, otp} = req.body
        const user = await User.findOne({ email: email})
        if(!user) return res.status(400).json({message: "User not found"})
        if(user.isVerified) return res.json({message: "User already verified"})
        if(user.otpAttempts >= OTP_ATTEMPTS) return res.status(400).json({message: "Login again"})
        if(user.otpExpiry<Date.now()) return res.status(400).json({message: "OTP Invalid"})
        const newOTP = await bcrypt.compare(otp,user.otp)
        if(newOTP){
            user.isVerified= true,
            user.otp = null,
            user.otpExpiry = null,
            user.otpAttempts = 0
            await user.save()
            return res.json({message: "OTP validated"})
        }else{
            user.otpAttempts+=1;
            await user.save()
            return res.status(400).json({message: "Invalid otp , request a new one"})
        }
    }catch(err){
        res.status(500).json({ message: `Server error: ${err.message}` });
    }
    
}

module.exports = {
    register,
    login,
    getProfile,
    refreshAccessToken,
    logout,
    logoutAllDevices,
    verifyOTP
}