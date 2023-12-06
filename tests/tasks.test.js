const request = require('supertest')
const app = require('../app')


describe("Task controller tests", () => {

  let createdTask
  let taskList;

  describe("Create Task list", () => {
    it("Should return 201 with task list for use in rest of suite", async () => {
      const response = await request(app)
        .post('/tasklists')
        .set("content-type", "application/json")
        .send({
          title: "Test tasklist",
          description: "Test description"
        })

      taskList = response.body
      expect(response.status).toBe(201)
    })
  })


  describe("Create Task", () => {
    it("Should return 201 with task created", async () => {
      const task = {
        title: "Test Task",
        description: "Test description",
        due_date: Date.now(),
        status: "Incomplete"
      }

      const response = await request(app)
        .post(`/tasklists/${taskList._id}/tasks`)
        .set("content-type", "application/json")
        .send(task)

      createdTask = response.body
      expect(response.status).toBe(201)
      expect(response.body.title).toBe(task.title)
    })
  })

  describe("Get All Tasks", () => {
    it("Should return 200 with an array of 1 task", async () => {
      const response = await request(app)
        .get(`/tasklists/${taskList._id}/tasks`)

      expect(response.status).toBe(200)
      expect(response.body.length).toBe(1)
    })
  })

  describe("Get Created Task", () => {

    it("Should return 200 with created task object", async () => {
      const response = await request(app)
        .get(`/tasklists/${taskList._id}/tasks/${createdTask._id}`)

      expect(response.status).toBe(200)
      expect(response.body.title).toBe(createdTask.title)
    })
  })
})
