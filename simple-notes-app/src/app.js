//Here we create the server by requiring it and calling the function inside the app variable
const express = require('express')
const noteModel = require('./models/note.model')
const app = express()

app.use(express.json())  //express.json() is a middleware which is used to read the json data came from the post api 

app.post('/notes', (req,res)=>{
    //Naya note create karna
})

app.get('/notes',(req,res)=>{
    //sab notes fetch karna
})

app.get('/notes/:id',(req,res)=>{
    //ek specific note fetch karna by id
})

app.put('/notes/:id',(req,res)=>{
    //ek note update karna
})

app.delete('/notes/:id',(req,res)=>{
    //ek note delete karna
})

//we export the called express function inside the app variable to use it to start the server
module.exports = app; 