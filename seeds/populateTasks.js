const connectDB = require('../config/db')
const fs = require('fs')
const Task = require('../schema/taskSchema')
const TaskList = require('../schema/taskListSchema')
require('dotenv').config()

/*
  *
  * Usage: From the root project directory run $ node ./seeds/populateTasks.js
  * Overview: Clears current tasks in DB and repopulates with data from tasks.json (100 tasks)
  * Note: Will not run in production
*/

async function populateDb() {
  connectDB()

  if (process.env.NODE_ENV !== 'production') {

    const taskList = await createTaskList()
    const tasks = await populateTasks(taskList._id)

    tasks.forEach(async (task) => {
      task.task_list = taskList._id
      await task.save()
    })

    taskList.tasks.push(...tasks)
    await taskList.save()
  } else {
    console.log("You cannot do this in production environment")
    process.exit(1)
  }
}

async function createTaskList() {
  try {
    const deletedLists = await TaskList.deleteMany({})
    const taskListData = {
      title: "Mock task list",
      description: "My Task list"
    }

    const taskList = await TaskList.create(taskListData)

    return taskList
  } catch (err) {
    console.log("error in createTaskList", err)
  }

}

async function populateTasks(taskListId) {

  try {
    const deletedTasks = await Task.deleteMany({})
    //Reads seed data into a buffer
    const data = fs.readFileSync('./seeds/tasks.json')


    const tasks = await Tasks.insertMany(JSON.parse(data))
    return tasks
  } catch (err) {
    console.log(err)
  }
}

populateDb()
