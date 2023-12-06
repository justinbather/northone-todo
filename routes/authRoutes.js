const express = require('express')
const { Login, Signup, Logout } = require('../controllers/auth')
const authenticateUser = require('../middleware/authenticateUser')

const router = express.Router()

router.post(`/login`, Login)
router.post('/signup', Signup)
router.get('/logout', Logout)
router.get('/verify', authenticateUser, (req, res) => {
  return res.sendStatus(200)
})

module.exports = router
