const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({

  title: String,
  description: String,
  status: {
    type: String,
    enum: ['Complete', 'Incomplete', 'Overdue'],
    default: 'Incomplete'
  }, //Refactor to enum
  due_date: Date,
  sub_tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      default: () => ({}),
    }
  ],
  parent_task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task"
  }
})


const Task = mongoose.model("Task", TaskSchema)

module.exports = Task
