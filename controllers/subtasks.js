const Task = require('../schema/taskSchema')

const createSubtask = async (req, res) => {
  try {
    const parentTaskId = req.params.taskId

    const parentTask = await Task.findById(parentTaskId)

    if (!parentTask) {
      return res.status(404).json({ message: "Error: No Parent task found with that id" })
    }

    const subTask = await Task.create(req.body)

    if (!subTask) {
      return res.status(400).json({ message: "Error creating subtask, make sure all fields are included in body (title, description, status, due_date)" })
    }

    subTask.parent_task = parentTask._id
    parentTask.sub_tasks.push(subTask._id)
    const savedSubtask = await subTask.save()
    await parentTask.save()
    return res.status(201).json(savedSubtask)
  } catch (err) {
    return res.status(500).json({ message: "Server error creating subtask", error: err.message })
  }

}


module.exports = { createSubtask }
