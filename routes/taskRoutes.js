const express = require('express')
const { getAllTasks, createTask, updateTask } = require('../controllers/tasks')


router = express.Router()


router.get('/', getAllTasks)
router.post('/', createTask)
router.patch('/:id', updateTask)

module.exports = router
