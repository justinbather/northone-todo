const request = require('supertest')
const app = require('../app')
const TaskList = require('../schema/taskListSchema')


describe("Task List Controller Functions", () => {
  let taskList;
  describe("Create Task List", () => {
    it("Should return 201 and task list created", async () => {
      const response = await request(app)
        .post("/tasklists")
        .set("content-type", "application/json")
        .send({
          title: "test task list",
          description: "test task list description"
        });

      expect(response.status).toBe(201)
      taskList = response.body
    })
  })
  describe("Get All Task Lists", () => {
    it("Should return 200 with task list", async () => {
      const response = await request(app)
        .get("/tasklists")

      expect(response.status).toBe(200)
    })
  })

  describe("Get One Task List", () => {
    it("Should return 200 with task list", async () => {
      const response = await request(app)
        .get(`/tasklists/${taskList._id}`)

      expect(response.status).toBe(200)
    })
  })

  describe("Delete task list", () => {
    it("Should return a 204 no content", async () => {
      const response = await request(app)
        .delete(`/tasklists/${taskList._id}`)

      expect(response.status).toBe(204)
    })
  })
})
