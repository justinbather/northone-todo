const express = require('express')

const { getAllTaskLists, createTaskList } = require('../controllers/taskLists')
const router = express.Router()

router.get('/', getAllTaskLists)
router.post('/', createTaskList)


module.exports = router
