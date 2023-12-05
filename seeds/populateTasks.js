const connectDB = require('../config/db')
const taskData = require('./tasks.json')
const fs = require('fs')
const Task = require('../schema/taskSchema')

function populateTasks() {

  connectDB()

  deleteTasks().then((res) => {
    console.log("deleted tasks successfully")
    insertTasks()
      .then((res) => console.log("inserted tasks successfully"))
      .catch((err) => {
        console.log("error inserting tasks: ", err)
      }).catch((err) => console.log("error deleted tasks: ", err))
  })
}

async function insertTasks() {

  //Reads seed data into a buffer
  const data = fs.readFileSync('./seeds/tasks.json')

  const tasks = await Task.insertMany(JSON.parse(data))

  return tasks
}

async function deleteTasks() {

  const deletedTasks = await Task.deleteMany({})
  return deletedTasks
}

populateTasks()
