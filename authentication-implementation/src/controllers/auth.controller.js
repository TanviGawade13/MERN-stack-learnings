//To write the logic for the routes 

const express = require('express')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

async function registerUser(req,res) {

    const { username,email,password} = req.body

    const user = await userModel.create({
        username, email, password
    })

    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET
    )

    res.cookie('token',token)

    res.status(201).json({
        message: "User created successfully",
        user
    })
}



module.exports = { registerUser }