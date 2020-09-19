const notesRouter = require('express').Router()
const Blog = require('../models/blog')

notesRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

notesRouter.post('/', async (request, response) => {

  if (request.body.likes === undefined){
    const blog = new Blog ({ title:request.body.title,author:request.body.author,url:request.body.url,likes:0 })
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  } else {
    const blog = new Blog(request.body)

    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  }

})

notesRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

notesRouter.delete('/:id', async (request,response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

notesRouter.put('/:id', async (request,response) => {
  const body = request.body

  const blog = {
    title : body.title,
    author: body.author,
    url : body.url,
    likes: body.likes
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(blog)
})


module.exports = notesRouter