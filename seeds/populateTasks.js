const connectDB = require('../config/db')
const fs = require('fs')
const Task = require('../schema/taskSchema')
require('dotenv').config()

/*
  *
  * Usage: From the root project directory run $ node ./seeds/populateTasks.js
  * Overview: Clears current tasks in DB and repopulates with data from tasks.json (100 tasks)
  * Note: Will not run in production
*/

function populateTasks() {

  connectDB()

  if (process.env.NODE_ENV !== 'production') {
    deleteTasks().then((res) => {
      console.log("deleted tasks successfully")
      insertTasks()
        .then((res) => console.log("inserted tasks successfully"))
        .catch((err) => {
          console.log("error inserting tasks: ", err)
        }).catch((err) => console.log("error deleted tasks: ", err))
    })

  } else {
    console.log("You cannot do this in production environment")
    process.exit(1)
  }
}

async function insertTasks() {

  //Reads seed data into a buffer
  const data = fs.readFileSync('./seeds/tasks.json')

  const tasks = await Task.insertMany(JSON.parse(data))

  return tasks
}

async function deleteTasks() {

  // Wipe current tasks
  const deletedTasks = await Task.deleteMany({})

  return deletedTasks
}

populateTasks()
