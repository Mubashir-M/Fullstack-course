const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)


const Blog = require('../models/blog')
let token


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

beforeEach((done) => {
  api
    .post('/api/login')
    .send({
      username: process.env.Test_Username,
      password: process.env.Test_Password,
    })
    .end((err, response) => {
      token = response.body.token
      done()
    })
})

describe('when there is initially some notes saved', () => {

  test('correct amount of blogs are returned as json', async () => {

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs unique identification parameter should be id', async () => {
    const response =await api.get('/api/blogs')

    let index = 0
    while (index<response.body.length){
      expect(response.body[index].id).toBeDefined()
      index++
    }
  })

})

describe ('when blogs are being created', () => {

  test('A blog with correct contents is created', async () => {

    const newBlog = new Blog({ title:'Useless Jargon', author:'Timothy Tim', url:'Timothy_Tim.com', likes:122, userId: '5f87ea0364a8da221ce43f62' })

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('content-type',/application\/json/)

    const response = await api.get('/api/blogs')
    const contentsTitle = response.body.map(blog => blog.title)
    const contentsAuthor = response.body.map(blog => blog.author)
    const contentsUrl = response.body.map(blog => blog.url)

    expect(response.body).toHaveLength(helper.initialBlogs.length+1)
    expect(contentsTitle).toContain('Useless Jargon')
    expect(contentsAuthor).toContain('Timothy Tim')
    expect(contentsUrl).toContain('Timothy_Tim.com')

  })

/
  test('when blog without likes created, default should be 0', async () => {
    const newBlog = new Blog({ title:'Useless Jargon',author:'Timothy Tim',url:'Timothy_Tim.com', userId: '5f87ea0364a8da221ce43f62' })

    const blog = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('content-type',/application\/json/)

    const response = await api.get(`/api/blogs/${blog.body.id}`)

    expect(response.body.likes).toBe(0)

  })

  test('when blog without title or url created, status code should be 400 Bad request', async () => {
    const newBlog = new Blog({ title:'Useless Jargon',likes:11, userId: '5f87ea0364a8da221ce43f62' })

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

  })

  test('when attempting to create a blog without a token,  status code should be 401 Unauthorized', async () => {
    const newBlog = new Blog({ title:'Useless Jargon',author:'Jargon',usrl:'Jargon.com',likes:11, userId: '5f87ea0364a8da221ce43f62' })

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

  })

})


afterAll(() => {
  mongoose.connection.close()
})