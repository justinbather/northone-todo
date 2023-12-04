const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

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


