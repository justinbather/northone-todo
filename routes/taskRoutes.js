const express = require('express')
const { getAllTasks, createTask, updateTask, deleteTask } = require('../controllers/tasks')


router = express.Router()


router.get('/', getAllTasks)
router.post('/', createTask)
router.patch('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = router
