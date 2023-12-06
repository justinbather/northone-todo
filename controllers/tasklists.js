const TaskList = require('../schema/taskListSchema')
const Task = require('../schema/taskSchema')


const getAllTaskLists = async (req, res) => {
  try {
    const taskLists = await TaskList.find({ $or: [{ public: true }, { creator: req.user }] }).populate('tasks').exec()
    if (taskLists.length > 0) {
      return res.status(200).json(taskLists)
    } else {
      return res.status(404).json({ message: "Error: No task lists found" })
    }
  } catch (err) {

    return res.status(500).json({ message: "Server error", error: err.message })
  }
}

const getOneTaskList = async (req, res) => {
  try {
    const { taskListId } = req.params
    const taskList = await TaskList.findOne({ _id: taskListId }).populate('tasks').populate('creator')

    if (taskList.creator._id === req.user || taskList.public) {

      return res.status(200).json(taskList)
    } else {
      return res.status(404).json({ message: "Error: You don't have access to that tasklist" })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Server error in getOneTaskList", error: err.message })
  }
}

const createTaskList = async (req, res) => {
  try {

    const taskList = await TaskList.create(req.body)
    taskList.creator = req.user
    await taskList.save({ new: true })
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

const deleteTaskList = async (req, res) => {
  try {
    const { taskListId } = req.params
    const deletedTaskList = await TaskList.findOneAndDelete({ _id: taskListId, creator: req.user })
    if (deletedTaskList) {
      await Task.deleteMany({ task_list: taskListId })
      return res.sendStatus(204)
    } else {
      return res.status(403).json({ message: "Error deleting tasklist: You don't own this tasklist" })
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error deleting task list", error: err.message })
  }
}

const updateTaskList = async (req, res) => {
  try {

    const { taskListId } = req.params
    const update = req.body

    const updatedTaskList = await TaskList.findOneAndUpdate({ _id: taskListId, creator: req.user }, update, { new: true })

    if (!updatedTaskList) {
      return res.status(500).json({ message: "Server Error updating task list" })
    } else {
      return res.status(200).json(updatedTaskList)
    }
  } catch (err) {
    return res.status(404).json({ message: "Error: Couldn't find a task list with that id that you own", })
  }
}

module.exports = { getAllTaskLists, createTaskList, addTasks, getOneTaskList, deleteTaskList, updateTaskList }
