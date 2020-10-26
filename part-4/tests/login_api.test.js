const mongoose = require('mongoose')
const supertest = require('supertest')
//const bcryptjs = require('bcryptjs')
//const User = require('../models/user')
const app = require('../app')
const api = supertest(app)


describe ('when login is tried after creating', () => {


  test ('Test for when login is tried after creating user', async () => {

    await api
      .post('/api/login')
      .send ({ username: process.env.Test_Username, password:process.env.Test_Password })
      .expect(200)

  })
})

afterAll(() => {
  mongoose.connection.close()
})