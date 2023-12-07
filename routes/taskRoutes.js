const express = require('express')
const { getAllTasks, createTask, updateTask, deleteTask, getOneTask, } = require('../controllers/tasks')
const { createSubtask } = require('../controllers/subtasks')
const checkIsCreator = require('../middleware/checkIsCreator')


//mergeParams to have access to parent url params
router = express.Router({ mergeParams: true })


router.get('/', getAllTasks)
router.get('/:taskId', getOneTask)
router.post('/', checkIsCreator, createTask)
router.patch('/:taskId', checkIsCreator, updateTask)
router.delete('/:taskId', checkIsCreator, deleteTask)
//Sub tasks
router.post('/:taskId/subtasks', checkIsCreator, createSubtask)

module.exports = router
