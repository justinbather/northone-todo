const request = require('supertest')
const app = require('../app')


describe('Test Task List permissions', () => {

  //Mock data
  user1 = {
    username: "user1",
    password: "123"
  }

  user2 = {
    username: "user2",
    password: "123"
  }

  //Store jwts for testing tasklist access
  let user1Jwt;
  let user2Jwt;
  let privTaskList;

  describe('Create 2 users', () => {
    it('Should return 201 with JWT token', async () => {

      const response = await request(app)
        .post('/auth/signup')
        .set("content-type", "application/json")
        .send(user1)

      expect(response.status).toBe(201)
      expect(response.headers['set-cookie']).toBeDefined()

      user1Jwt = response.headers['set-cookie']
    })
    it('Should return 201 with JWT token', async () => {

      const response = await request(app)
        .post('/auth/signup')
        .set("content-type", "application/json")
        .send(user2)

      expect(response.status).toBe(201)
      expect(response.headers['set-cookie']).toBeDefined()
      user2Jwt = response.headers['set-cookie']
    })
  })


  describe('Create A Private Task List', () => {
    it('Should return 201 with taskList', async () => {

      const response = await request(app)
        .post('/tasklists')
        .set("content-type", "application/json")
        .set('Cookie', user1Jwt)
        .send({
          title: "Test list",
          description: "test desc",
          public: false
        })

      privTaskList = response.body
      console.log(privTaskList)
      expect(response.status).toBe(201)
    })

    describe('Get Private Tasklist', () => {
      it('Should return a 403, no authorization', async () => {

        const response = await request(app)
          .get(`/tasklists/${privTaskList._id}`)
          .set('Cookie', user2Jwt)


        expect(response.status).toBe(403)

      })
      it('Should return 200 ', async () => {

        const response = await request(app)
          .get(`/tasklists/${privTaskList._id}`)
          .set('Cookie', user1Jwt)


        expect(response.status).toBe(200)
      })

    })

  })

})
