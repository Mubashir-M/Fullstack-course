const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Tom Thom',
    author: 'Thomas',
    url : 'Thom.com',
    likes : 110,
    userId: '5f85ddcf5949a026280df355'
  },
  {
    title: 'Sam Sams',
    author: 'Sams',
    url : 'Sam.com',
    likes : 10,
    userId: '5f85ddcf5949a026280df355'
  }
]

const nonExistingId = async () => {
  const Blog = new Blog({ title: 'No title',author:'No author', url:'No url', likes:0 })
  await Blog.save()
  await Blog.remove()

  return Blog._id.toString()
}

const BlogsInDb = async () => {
  const Blogs = await Blog.find({})
  return Blogs.map(Blog => Blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}



module.exports = {
  initialBlogs,
  nonExistingId,
  BlogsInDb,
  usersInDb,
}