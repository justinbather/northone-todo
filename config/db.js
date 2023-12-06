const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
require('dotenv').config()



const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI
    if (process.env.NODE_ENV === 'test') {
      const mongoServer = await MongoMemoryServer.create()
      uri = mongoServer.getUri()
    }
    mongoose.set("strictQuery", true)
    await mongoose.connect(uri)

    if (process.env.NODE_ENV === 'test') {
      console.log('Test In-Memory MongoDB server running')
    } else {
      console.log('MongoDB Connected')
    }
  } catch (err) {
    console.error(`error connecting to MongoDb: ${err}`)
    process.exit(1)
  }
}


module.exports = connectDB
