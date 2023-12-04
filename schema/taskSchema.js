const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({

  title: String,
  description: String,
  status: String, //Refactor to enum
  due_date: Date
})


const Task = mongoose.Model("Task", TaskSchema)

module.exports = Task
