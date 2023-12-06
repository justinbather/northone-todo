const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const connectTestDb = require('./db')

let mongod;

beforeAll(async () => {
  console.log('before all entered')
  jest.setTimeout(10000)
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await connectTestDb(uri)
});
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
});
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key]; g,
      await collection.deleteMany();
  }

});
