const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

//config
const connectDB = require('./config/db')

//Routes
const taskListRoutes = require('./routes/taskListRoutes')
const app = express()

connectDB()


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


module.exports = app

