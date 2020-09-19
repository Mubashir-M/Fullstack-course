var _ = require('lodash')

const dummy = (blogs) => {
  // ...
  //console.log('here is blog data:',blogs)
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length===0){
    return null
  }

  const likes_sum = blogs.reduce((sum,blog) => {
    return sum+blog.likes
  },0)
  return likes_sum
}

const favoriteBlog= (blogs) => {
  if (blogs.length===0){
    return null
  }

  var result = blogs[0]
  var i=0
  for ( ; i< blogs.length; i++){
    if (blogs[i].likes > result.likes) {
      result = blogs[i]
    }
  }

  result={
    title: result.title,
    author: result.author,
    likes: result.likes
  }
  return result

}

const mostBlogs = (blogs) => {
  if (blogs.length===0){
    return null
  }

  const authorsAndBlog_count = _(blogs).groupBy('author').map((blog,id) => ({
    author:id,
    blogs: blog.length })).value()

  const result = _.last(_.sortBy(authorsAndBlog_count,'blogs'))
  return result
}

const mostLikes = (blogs) => {
  if (blogs.length === 0){
    return null
  }
  const authorsAndLikes = _(blogs).groupBy('author').map((blog,id) => ({
    author:id,
    likes: _.sumBy(blog,'likes') })).value()

  const result = _.last(_.sortBy(authorsAndLikes,'likes'))

  return result
}

module.exports = {
  dummy,totalLikes,favoriteBlog,mostBlogs,mostLikes
}