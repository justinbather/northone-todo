const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')



//config
connectDB()
//Routes
const taskListRoutes = require('./routes/taskListRoutes')
const authRoutes = require('./routes/authRoutes')
const app = express()



// Middlewares
// Request body parsing
app.use(express.json())
// Cookie parsing
app.use(cookieParser())
//CORS access
app.use(cors({ origin: true, credentials: true }))

//Routes
//Auth: Login, signup, logout
//Tasks: CRUD
app.use('/tasklists', taskListRoutes)
app.use('/auth', authRoutes)


module.exports = app

