const Task = require('../schema/taskSchema')


const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).populate('sub_tasks').exec()
    return res.status(200).json(tasks)
  } catch (err) {
    return res.status(500).json({ message: "error fetching tasks", error: err })
  }
}

const getOneTask = async (req, res) => {
  try {
    const taskId = req.params.id
    const task = await Task.findById(taskId).populate('sub_tasks').populate('parent_task').exec()
    if (task) {
      return res.status(200).json(task)
    } else {
      return res.status(404).json({ message: "Error: No task found with that Id" })
    }
  } catch (err) {
    return res.status(500).json({ message: "Server Error fetching task", error: err.message })
  }
}

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)

    if (task) {
      return res.status(201).json(task)
    } else {
      return res.status(404).json({ message: "Error creating task. A task needs a title, description, status, and date" })
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error creating task", error: err })
  }
}

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id

    //returns document with new changes made
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true })

    if (updatedTask) {
      return res.status(200).json(updatedTask)
    } else {
      return res.status(404).json({ message: "No task found with that id" })
    }
  } catch (err) {

    console.error(err)
    return res.status(500).json({ message: "Server error occured updating task", error: err.message })
  }
}

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id

    const deletedTask = await Task.findByIdAndDelete(taskId)

    if (deletedTask) {
      return res.sendStatus(204)
    } else {
      return res.status(404).json({ message: "Error: No task found with that id" })
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error deleting task", error: err.message })
  }
}

module.exports = { getAllTasks, createTask, updateTask, deleteTask, getOneTask }
