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

  describe("Update task to completed", () => {
    it("should return 200 with a completed status", async () => {
      const response = await request(app)
        .patch(`/tasklists/${taskList._id}/tasks/${createdTask._id}`)
        .set("content-type", "application/json")
        .send({
          status: "Complete"
        })

      expect(response.status).toBe(200)
      expect(response.body.status).toBe("Complete")
    })
  })

  describe("Add subtask to created task", () => {
    it("Should return 201 with the new task and have the correct parent task", async () => {
      const subTask = {
        title: "Test Subtask",
        description: "Subtask description",
        due_date: Date.now()
      }
      const response = await request(app)
        .post(`/tasklists/${taskList._id}/tasks/${createdTask._id}/subtasks`)
        .set("content-type", "application/json")
        .send(subTask)

      expect(response.status).toBe(201)
      expect(response.body.parent_task).toBe(createdTask._id)
    })
  })

  describe("Check tasks subtasks", () => {
    it("Should return 200 with the task and its array of subtasks should have a length of 1", async () => {
      const response = await request(app)
        .get(`/tasklists/${taskList._id}/tasks/${createdTask._id}`)

      console.log(response.body)
      expect(response.status).toBe(200)
      expect(response.body.sub_tasks.length).toBe(1)
    })
  })

  describe("Delete created Task", () => {
    it("Should return 204, deleting the task given and any sub_tasks related", async () => {
      const response = await request(app)
        .delete(`/tasklists/${taskList._id}/tasks/${createdTask._id}`)

      expect(response.status).toBe(204)
    })
  })

  describe("Get all tasks after deletion", () => {
    it("Should return 200 with a length of 0", async () => {
      const response = await request(app)
        .get(`/tasklists/${taskList._id}/tasks`)

      expect(response.status).toBe(200)
      expect(response.body.length).toBe(0)
    })
  })
})
