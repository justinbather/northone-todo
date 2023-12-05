const TaskList = require('../schema/taskListSchema')


const getAllTaskLists = async (req, res) => {
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

module.exports = { getAllTaskLists }
