const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {

  const blog = new Blog ({
    title:request.body.title,
    author:request.body.author,
    url:request.body.url,
    likes: request.body.likes === undefined ? 0 :  request.body.likes
  })

  const savedBlog = await blog.save()
  response.json(savedBlog.toJSON())

})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request,response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request,response) => {
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


module.exports = blogsRouter