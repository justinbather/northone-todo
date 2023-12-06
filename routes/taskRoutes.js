const express = require('express')
const { getAllTasks, createTask, updateTask, deleteTask, getOneTask } = require('../controllers/tasks')
const { createSubtask } = require('../controllers/subtasks')


//mergeParams to have access to parent url params
router = express.Router({ mergeParams: true })


router.get('/', getAllTasks)
router.get('/:taskId', getOneTask)
router.post('/', createTask)
router.patch('/:taskId', updateTask)
router.delete('/:taskId', deleteTask)
//Sub tasks
router.post('/:taskId/subtasks', createSubtask)

module.exports = router
