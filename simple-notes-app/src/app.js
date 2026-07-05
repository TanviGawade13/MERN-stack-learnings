//Here we create the server by requiring it and calling the function inside the app variable
const express = require('express')
const noteModel = require('./models/note.model')
const app = express()

app.use(express.json())  //express.json() is a middleware which is used to read the json data came from the post api 

app.post('/notes', async (req,res)=>{
    //Naya note create karna
    try{
        const note = await noteModel.create({
            title: req.body.title,
            caption: req.body.caption,
            category: req.body.category,
        })
    
        return res.status(201).json({
            message: "Note created successfully",
            note
        })
    } catch(err){
        res.status(500).json({ error: err.message })
    }
})

app.get('/notes', async (req,res)=>{
    //sab notes fetch karna
    try{
        const notes = await noteModel.find()
        return res.status(200).json({
            message:"Notes fetched successfully",
            notes
        })
    } catch (err){
        res.status(500).json({
            error: err.message
        })
    }
})

app.get('/notes/:id',async (req,res)=>{
    //ek specific note fetch karna by id
    try{
        const note = await noteModel.findById(req.params.id)
        if(!note){
            return res.status(404).json({ error: "Note not found" })
        } //else ki jarurat nahi hai kyuki if note nahi mila toh function return ho raha hai and the next lines dont get executed anyways 
        res.json({  //if status code is not passed then json considers default status as 200
            message: "Notes fetched successfully",
            note
        })
        
    } catch (err){
        res.status(500).json({
            error: err.message
        })
    }
})

app.put('/notes/:id', async (req,res)=>{
    //ek note update karna
    try{
        const updatedNote = await noteModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true , runValidators: true }  //return karte vakt aapko updated note deta hai 
            //Mongodb by default note update krta hai but user ko bhejte vakt puraa wala bhejta hai 
            // so to avoid this we use {new: true} so tht updated note user ko dikhaya jaye 
            //This avoid wrong data to be taken as input and saved in database
        )
        if(!updatedNote){
            return res.status(404).json({ error: "Note not found"})
        }
        res.json(updatedNote)

    } catch(err){
        res.status(500).json({ error: err.message })
    }
})

app.delete('/notes/:id', async (req,res)=>{
    //ek note delete karna
    try{
        const del = await noteModel.findByIdAndDelete(req.params.id)
        if(!del){
            return res.status(404).json({ error: "Note not found"})
        }
        res.json({
            message: "Note deleted successfully",
        })

    } catch(err){
        res.status(500).json({
            error: err.message
        })
    }
})

//we export the called express function inside the app variable to use it to start the server
module.exports = app; 