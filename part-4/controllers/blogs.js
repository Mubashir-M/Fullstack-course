const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 } )
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or ivalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog ({
    title:body.title,
    author:body.author,
    url:body.url,
    likes: body.likes === undefined ? 0 :  body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
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

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or ivalid' })
  }

  const blog = await Blog.findById(request.params.id)
  console.log('here is decodedtoken: ' , decodedToken)
  console.log('blog user id is: ', blog.user.toString())
  console.log('token user id is: ', decodedToken.id.toString())

  if (blog.user.toString() === decodedToken.id.toString() ){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()

  } else {
    return response.status(401).json({ error: 'User is not the creator of this content and thus not authorized to remove it.' })
  }

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