const express = require('express')
const { getAllTasks, createTask, updateTask, deleteTask, getOneTask } = require('../controllers/tasks')


router = express.Router()


router.get('/', getAllTasks)
router.get('/:id', getOneTask)
router.post('/', createTask)
router.patch('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = router
