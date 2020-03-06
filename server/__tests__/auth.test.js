require('dotenv').config({ path: 'test.env' })
const request = require('supertest')
const server = require('../config/server')
const { resetDB } = require('../config/db')

jest.mock('../config/db')

describe('Auth', () => {
  afterEach(() => {
    resetDB()
  })

  test('POST', async done => {
    // First request fail, because user not exists
    const loginData = {
      email: 'john.smith@gmail.com',
      password: '123456'
    }
    await request(server)
      .post('/api/auth')
      .send(loginData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    // Creates the user
    const userData = {
      ...loginData,
      firstName: 'John',
      lastName: 'Smith'
    }
    await request(server)
      .post('/api/users')
      .send(userData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    // Second request ok
    request(server)
      .post('/api/auth')
      .send(loginData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body).not.toBeNull()
        expect(res.body.token).not.toBeNull()
        done()
      })
  })

  test('GET', async done => {
    // Creates the user
    const loginData = {
      email: 'john.smith@gmail.com',
      password: '123456'
    }
    const userData = {
      ...loginData,
      firstName: 'John',
      lastName: 'Smith'
    }
    await request(server)
      .post('/api/users')
      .send(userData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    // Gets the token
    const resp = await request(server)
      .post('/api/auth')
      .send(loginData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    // Renews the token
    const token = resp.body.token
    await request(server)
      .get('/api/auth')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).not.toBeNull()
        expect(res.body.token).not.toBeNull()
        expect(res.body.token).not.toBe(token) // token was renewed
        done()
      })
  })
})
