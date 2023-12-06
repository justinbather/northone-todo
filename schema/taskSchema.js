const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({

  title: String,
  description: String,
  status: {
    type: String,
    enum: ['Complete', 'Incomplete', 'Overdue'],
    default: 'Incomplete'
  },
  importance: {
    type: String,
    enum: ['Not Important', 'Slightly Important', 'Important', 'Very Important', 'Critical']
    default: 'Important'
  },
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
  },
  task_list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task List",
  }
})


const Task = mongoose.model("Task", TaskSchema)

module.exports = Task
