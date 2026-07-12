const { login, register, getProfile, refreshAccessToken, logout, logoutAllDevices } = require("../controllers/authControllers");
const express = require('express');
const verifyToken = require("../middleware/verifyToken");
const router = express.Router()

router.post('/login' , login)
router.post('/register', register)
router.get('/profile',verifyToken, getProfile) //in functions ko call karna nahi padta express khud call krta hai inhe 
router.post('/refresh', refreshAccessToken)
router.post('/logout', logout)
router.post('/logout-all',verifyToken, logoutAllDevices)

module.exports = router