const express = require('express')
const { Login, Signup, Logout } = require('../controllers/auth')

const router = express.Router()

router.post(`/login`, Login)
router.post('/signup', Signup)
router.get('/logout', Logout)

module.exports = router
