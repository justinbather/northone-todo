const TaskList = require('../schema/taskListSchema')

const checkIsCreator = async (req, res, next) => {

  try {
    const taskListId = req.params.taskListId
    const taskList = await TaskList.findById(taskListId)
    if (taskList.creator.equals(req.user) || taskList.public) {
      return next()
    } else {
      return res.sendStatus(403)
    }
  } catch (err) {
    return res.status(500).json({ message: "Error in checkIsCreator middleware", error: err.message })
  }
}


module.exports = checkIsCreator
