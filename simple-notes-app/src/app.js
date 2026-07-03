//Here we create the server by requiring it and calling the function inside the app variable
const express = require('express')
const app = express()

app.use(express.json())  //express.json() is a middleware which is used to read the json data came from the post api 

app.post('')

//we export the called express function inside the app variable to use it to start the server
module.exports = app; 