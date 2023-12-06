const express = require('express')

const { getAllTaskLists, createTaskList, getOneTaskList, deleteTaskList, updateTaskList } = require('../controllers/taskLists')
const authenticateUser = require('../middleware/authenticateUser.js')
const taskRoutes = require('./taskRoutes.js')
const checkIsCreator = require('../middleware/checkIsCreator.js')

const router = express.Router()

router.get('/', getAllTaskLists)
router.get('/:taskListId', getOneTaskList)
router.post('/', authenticateUser, createTaskList)
router.delete('/:taskListId', authenticateUser, checkIsCreator, deleteTaskList)
router.patch('/:taskListId', authenticateUser, checkIsCreator, updateTaskList)
router.use('/:taskListId/tasks', authenticateUser, taskRoutes)


module.exports = router
