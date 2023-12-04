const mongoose = require('mongoose')
require('dotenv').config()

const uri = process.env.MONGO_URI

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true)
    await mongoose.connect(uri)

    console.log('MongoDB Connected')
  } catch (err) {
    console.error(`error connecting to MongoDb: ${err}`)
    process.exit(1)
  }
}


module.exports = connectDB
