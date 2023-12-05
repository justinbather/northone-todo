const express = require('express')

const { getAllTaskLists } = require('../controllers/taskLists')
const router = express.Router()

router.get('/', getAllTaskLists)


module.exports = router
