//start the server
require('dotenv').config();  //You can access the values inside the .env folder 
const app = require('./src/app')
const connectDB = require('./src/db/db')

connectDB();

app.listen(3000,()=>{
    console.log('Server started on port 3000')
})