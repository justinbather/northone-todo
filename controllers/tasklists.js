const TaskList = require('../schema/taskListSchema')
const Task = require('../schema/taskSchema')


const getAllTaskLists = async (_req, res) => {
  try {

    const taskLists = await TaskList.find({}).populate('tasks').exec()
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

const addTasks = async (req, res) => {
  try {

    const taskIds = req.query.add.split(' ')
    const taskListId = req.params.id

    const taskList = await TaskList.findById(taskListId)

    if (!taskList) {
      return res.status(404).json({ message: "Error: No task list found with that id" })
    }

    //Loop over task ids to make sure all tasks exist
    //Can add a failover to remove any non existent tasks and only add the found ones
    taskIds.forEach(id => {
      Task.findById(id).catch((err) => {
        return res.status(404).json({ message: "Error adding task to list", error: err.message })
      })
    });

    taskList.tasks.push(...taskIds)
    const savedTaskList = await taskList.save()
    return res.status(201).json(savedTaskList)
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message })
  }
}

module.exports = { getAllTaskLists, createTaskList, addTasks }
