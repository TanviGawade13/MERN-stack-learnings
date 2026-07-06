const express = requie('express')
const authRoutes = require('./routes/auth.routes')

const app = express();
app.use(express.json())

app.use('/api/auth',authRoutes)   //APIs created using router need to use the /api/auth as the prefix 

module.exports = app