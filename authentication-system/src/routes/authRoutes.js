const { login, register, getProfile, refreshAccessToken, logout, logoutAllDevices, verifyOTP } = require("../controllers/authControllers");
const express = require('express');
const verifyToken = require("../middleware/verifyToken");
const router = express.Router()

//sirf express routes se call kiye gaye function se req,res object milta hai parameter mai s
router.post('/login', login)
router.post('/register', register)
router.get('/profile', verifyToken, getProfile) //in functions ko call karna nahi padta express khud call krta hai inhe 
router.post('/refresh', refreshAccessToken)
router.post('/logout', logout)
router.post('/logout-all', verifyToken, logoutAllDevices)
router.post('verify-otp', verifyOTP)

module.exports = router