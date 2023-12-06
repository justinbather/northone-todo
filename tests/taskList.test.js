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
      //Store task list for use in rest of tests
      taskList = response.body
    })
  })

  describe("Get All Task Lists", () => {
    it("Should return 200 with array of tasklists", async () => {
      const response = await request(app)
        .get("/tasklists")

      expect(response.status).toBe(200)
      expect(response.body.length).not.toBe(0)
      console.log(response.body)
    })
  })

  describe("Get One Task List", () => {
    it("Should return 200 with task list", async () => {
      const response = await request(app)
        .get(`/tasklists/${taskList._id}`)

      expect(response.status).toBe(200)
    })
  })

  describe("Update task list info", () => {
    it("Should return 200 with updated task list", async () => {

      const response = await request(app)
        .patch(`/tasklists/${taskList._id}`)
        .set("content-type", "application/json")
        .send({
          title: "Updated title"
        })

      expect(response.status).toBe(200)
      expect(response.body.title).toBe("Updated title")
    })
    it("Should return 404 not found", async () => {
      const response = await request(app)
        .patch('/tasklists/123')
        .set("content-type", "application/json")
        .send({
          title: "New title"
        })

      expect(response.status).toBe(404)
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
