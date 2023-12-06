const mongoose = require('mongoose')

const TaskListSchema = new mongoose.Schema({

  title: {
    type: String,
    required: [true, "A title is required to create a task list"],
  },
  description: String,
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    default: () => ({})
  }],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  public: {
    type: Boolean,
    default: true
  },
  created_on: {
    type: Date,
    default: Date.now
  }
});

const TaskList = mongoose.model('Task List', TaskListSchema)
module.exports = TaskList
