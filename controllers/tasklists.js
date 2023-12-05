const TaskList = require('../schema/taskListSchema')


const getAllTaskLists = async (_req, res) => {
  try {

    const taskLists = await TaskList.find({})
    if (taskLists.length > 0) {
      return res.status(200).json(taskLists)
    } else {
      return res.status(404).json({ message: "Error: No task lists found" })
    }
  } catch (err) {

    return res.status(500).json({ message: "Server error", error: err.message })
  }
}

const createTaskList = async (req, res) => {
  try {

    const taskList = await TaskList.create(req.body)
    if (taskList) {
      return res.status(201).json(taskList)
    } else {
      return res.status(400).json({ message: "Error creating task list. Make sure all fields are in request body (title, description)" })
    }
  } catch (err) {

    return res.status(500).json({ message: "Server error creating task list", error: err.message })
  }
}

module.exports = { getAllTaskLists, createTaskList }
