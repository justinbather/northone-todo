const express = require('express')

const { getAllTaskLists, createTaskList, addTasks } = require('../controllers/taskLists')
const router = express.Router()

router.get('/', getAllTaskLists)
router.post('/', createTaskList)
router.post('/:id', addTasks)


module.exports = router
