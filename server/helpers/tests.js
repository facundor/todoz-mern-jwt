/* istanbul ignore next file */
const request = require('supertest')

const login = async server => {
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

  return resp.body.token
}

module.exports = { login }
