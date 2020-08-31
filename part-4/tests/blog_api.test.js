const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const { initialBlogs } = require('./test_helper')


beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})


test('correct amount of blogs are returned as json', async () => {
  const response =await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs unique identification parameter should be "id"', async () => {
  const response =await api.get('/api/blogs')

  const checkID = () => {
    let index = 0
    while (index<response.body.length){
      if (response.body[index].id === null){
        return null
      }
      index++
    }

    return true
  }

  expect(checkID).toBeDefined()
})

test('A blog with correct contents is created', async () => {
  const newBlog = new Blog({ title:'Useless Jargon',author:'Timothy Tim',url:'Timothy_Tim.com',likes:122 })

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('content-type',/application\/json/)

  const response = await api.get('/api/blogs')
  const contentsTitle = response.body.map(blog => blog.title)
  const contentsAuthor = response.body.map(blog => blog.author)
  const contentsUrl = response.body.map(blog => blog.url)

  expect(response.body).toHaveLength(initialBlogs.length+1)
  expect(contentsTitle).toContain('Useless Jargon')
  expect(contentsAuthor).toContain('Timothy Tim')
  expect(contentsUrl).toContain('Timothy_Tim.com')
})

test('when blog without likes created, default should be 0', async () => {
  const newBlog = new Blog({ title:'Useless Jargon',author:'Timothy Tim',url:'Timothy_Tim.com' })

  const blog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('content-type',/application\/json/)

  const response = await api.get(`/api/blogs/${blog.body.id}`)

  expect(response.body.likes).toBe(0)

})

test('when blog without title or url created, status code should be "400 Bad request', async () => {
  const newBlog = new Blog({ title:'Useless Jargon',likes:11 })

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

})


afterAll(() => {
  mongoose.connection.close()
})