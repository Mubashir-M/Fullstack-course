const notesRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require ('../utils/logger')


notesRouter.get('/', (request, response,next) => {
  console.log('INSIDE GET FUNCTION!')
  Blog
    .find({})
    .then(blog => {
      logger.info('Completed get successfully!')
      response.json(blog)
    })
    .catch(error => next(error))
})

notesRouter.post('/', (request, response,next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      logger.info('Completed post successfully!')
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

module.exports = notesRouter