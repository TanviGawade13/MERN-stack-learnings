const mongoose = require('mongoose')

const connectDB = async ()=>{
    await mongoose.connect(`${process.env.MONGO_URL}/auth-system`)
    console.log("Connected to DB")
}

module.exports = connectDB