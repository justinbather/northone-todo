const express = require('express')

const { getAllTaskLists, createTaskList, getOneTaskList } = require('../controllers/taskLists')
const taskRoutes = require('./taskRoutes.js')

const router = express.Router()

router.get('/', getAllTaskLists)
router.get('/:taskListId', getOneTaskList)
router.post('/', createTaskList)
router.use('/:taskListId/tasks', taskRoutes)


module.exports = router
