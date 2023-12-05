const express = require('express')
const { getAllTasks, createTask, updateTask, deleteTask, getOneTask } = require('../controllers/tasks')
const { createSubtask } = require('../controllers/subtasks')


router = express.Router()


router.get('/', getAllTasks)
router.get('/:id', getOneTask)
router.post('/', createTask)
router.patch('/:id', updateTask)
router.delete('/:id', deleteTask)
//Sub tasks
router.post('/:id/subtasks', createSubtask)

module.exports = router
