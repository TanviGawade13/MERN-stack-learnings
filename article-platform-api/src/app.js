const express = require('express')
const cookieParser = require('cookie-parser')
const bcrpyt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()

app.use(express.json())
app.use(cookieParser())



app.get('/', (req, res) => {
    res.cookie("name", "tanvi") //cookie set karne ke liye res use hota hai 
    const token = jwt.sign({ email: "test@xyz" }, "secret_key")  
    //basically .sign takes your data and the secret key and runs a hshing algorithm over it and returns a token string 
    res.cookie("token", token)
    res.send("done")
})

app.get('/read', (req, res) => {
    console.log(req.cookies);  //cookie read karne ke liye req use hota hai 
    const data = jwt.verify(req.cookies.token, "secret_key")  //returns decoded data object 
    console.log(data)
    res.send('read-page')
})
module.exports = app