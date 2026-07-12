const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type:Number,
        default: null

    },
    otpExpiry:{
        type: Date,
        default: null

    },
    otpAttempts:{
        type: Number,
        default : 0
    },
    tokenVersion:{
        type: Number,
        default: 0 //isse null nahi rakhna becoz hume iski increment karni hai aur null object consider hota hai jiski increment nahi ho sakti
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User