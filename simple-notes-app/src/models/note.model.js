// This will contain the schema and model of the collection 
const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: String,
    caption: String,
    category: String,
})

const noteModel = mongoose.model('note',noteSchema)

module.exports = noteModel;