var _ = require('lodash')

const dummy = (blogs) => {
  // ...
  console.log('here is blog data:',blogs)
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

  var result= blogs[0]

  const groupByAuthors=  _.sortBy(_.groupBy(blogs,'author'), (blog) =>  {
    return blog.length
  })


  var count = 0
  var i = 0

  for (;i<groupByAuthors.length;i++){
    if (groupByAuthors[i].length> count){
      result = groupByAuthors[i][0]
      count = groupByAuthors[i].length
    }
  }

  result = {
    author:result.author,
    blogs:count
  }
  return result
}
// mostLikes()
// groupby authors and map to (author,likeSum) using reduce for each group

module.exports = {
  dummy,totalLikes,favoriteBlog,mostBlogs//mostLikes
}