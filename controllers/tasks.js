const Task = require('../schema/taskSchema')
const TaskList = require('../schema/taskListSchema')


const getAllTasks = async (req, res) => {
  try {

    //Query params for query filter building
    const sortBy = req.query.sort_by
    const status = req.query.status
    const importance = req.query.importance
    const searchTerm = req.query.search

    const taskListId = req.params.taskListId

    const queryFilter = { task_list: taskListId }

    // Build query filter, adding only defined values from above
    if (status !== undefined) {
      queryFilter.status = status
    }

    if (importance !== undefined) {
      queryFilter.importance = importance
    }

    let tasks;

    if (searchTerm) {
      const searchRegex = new RegExp(searchTerm)
      const tasks = await Task.find({ ...queryFilter, title: { $regex: searchRegex, $options: 'i' } }).populate('sub_tasks').exec()
      return res.status(200).json(tasks)

    } else {

      tasks = await Task.find(queryFilter).sort(sortBy).populate('sub_tasks').exec()
    }

    return res.status(200).json(tasks)

  } catch (err) {
    return res.status(500).json({ message: "error fetching tasks", error: err })
  }
}

const getOneTask = async (req, res) => {
  try {
    const taskId = req.params.taskId
    const task = await Task.findById(taskId).populate('sub_tasks').exec()

    if (task) {
      return res.status(200).json(task)
    } else {
      return res.status(404).json({ message: "Error: No task found with that Id" })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Server Error fetching task", error: err.message })
  }
}

const createTask = async (req, res) => {
  try {
    const taskListId = req.params.taskListId

    if (!taskListId) {
      return res.status(404).json({ message: "Error: You must provide a valid task list" })
    }

    const taskList = await TaskList.findById(taskListId)
    if (!taskList) {
      return res.status(404).json({ message: "Error: No task list found with that id" })
    }

    //Create task and set tasklist
    const task = await Task.create(req.body)
    task.task_list = taskList._id
    const savedTask = await task.save()

    //Add task to task_list array and save
    taskList.tasks.push(task._id)
    await taskList.save()

    if (savedTask) {
      return res.status(201).json(savedTask)
    } else {
      return res.status(404).json({ message: "Error creating task. A task needs a title, description, status, and date" })
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error creating task", error: err })
  }
}

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskId

    //returns document with new changes made
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true })

    if (updatedTask) {
      return res.status(200).json(updatedTask)
    } else {
      return res.status(404).json({ message: "No task found with that id" })
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error occured updating task", error: err.message })
  }
}

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId

    let deletedTask = await Task.findById(taskId).populate('sub_tasks').populate('parent_task').exec()
    if (deletedTask.parent_task) {
      deletedTask.parent_task.sub_tasks.pull(deletedTask._id)
    }
    if (deletedTask.sub_tasks.length > 0) {

      await Task.deleteMany({ parent_task: deletedTask._id })
    }

    deletedTask = await Task.deleteOne({ _id: deletedTask._id })
    if (deletedTask) {
      return res.sendStatus(204)
    } else {
      return res.status(404).json({ message: "Error: No task found with that id" })
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error deleting task", error: err.message })
  }
}

module.exports = { getAllTasks, createTask, updateTask, deleteTask, getOneTask, }
