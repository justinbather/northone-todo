const request = require('supertest')
const app = require('../app')
const TaskList = require('../schema/taskListSchema')


describe("Task List Controller Functions", () => {
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
    })
  })
})
