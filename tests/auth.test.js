const request = require('supertest')
const app = require('../app')

describe("User Auth Tests (JWT)", () => {

  let jwtToken;
  let mockUser = {
    username: "test",
    password: "123"
  }

  describe('User Signup Test', () => {
    it('Should return 201 with a jwt token in header', async () => {

      const response = await request(app)
        .post('/auth/signup')
        .set("content-type", "application/json")
        .send(mockUser)
      jwtToken = response.headers['set-cookie']

      expect(response.status).toBe(201)
      expect(response.headers['set-cookie']).toBeDefined()
    })
  })

  describe('User Logout Test', () => {
    it('Should return 200 and remove cookies', async () => {

      const response = await request(app)
        .get('/auth/logout')
        .set('Cookie', jwtToken)


      expect(response.status).toBe(200)
      expect(response.headers['set-cookie']).not.toBe(jwtToken)
    })
  })

  describe('User Login Test', () => {
    it('Should return 200 with JWT token', async () => {

      const response = await request(app)
        .post('/auth/login')
        .set("content-type", "application/json")
        .send(mockUser)

      jwtToken = response.headers['set-cookie']
      expect(response.status).toBe(200)
      expect(response.headers['set-cookie']).toBeDefined()
    })
  })

  describe('User Auth Middleware Test', () => {
    it('Should return 200 OK', async () => {
      const response = await request(app)
        .get('/auth/verify')
        .set('Cookie', jwtToken)

      expect(response.status).toBe(200)
    })
  })
})
