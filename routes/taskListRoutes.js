const express = require('express')

const { getAllTaskLists, createTaskList, getOneTaskList, deleteTaskList, updateTaskList } = require('../controllers/taskLists')
const authenticateUser = require('../middleware/authenticateUser.js')
const taskRoutes = require('./taskRoutes.js')

const router = express.Router()

router.get('/', authenticateUser, getAllTaskLists)
router.get('/:taskListId', authenticateUser, getOneTaskList)
router.post('/', authenticateUser, createTaskList)
router.delete('/:taskListId', authenticateUser, deleteTaskList)
router.patch('/:taskListId', authenticateUser, updateTaskList)
router.use('/:taskListId/tasks', authenticateUser, taskRoutes)


module.exports = router
