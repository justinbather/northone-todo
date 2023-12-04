const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

//config
const connectDB = require('./config/db')

//Routes
const taskRoutes = require('./routes/taskRoutes')
const app = express()

connectDB()

const PORT = process.env.PORT || 8000

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
app.use('/tasks', taskRoutes)

app.get('/', (_req, res) => {
  return res.status(200).json("hello world")
})

app.listen(PORT, () => console.log(`Server listening on port:${PORT}`))

