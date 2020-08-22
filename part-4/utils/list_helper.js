const dummy = (blogs) => {
  // ...
  console.log('here is blog data:',blogs)
  return 1
}

const totalLikes = (blogs) => {
  const likes_sum = blogs.reduce((sum,blog) => {
    return sum+blog.likes
  },0)
  return likes_sum
}

// mostBlogs()
// mostLikes()

module.exports = {
  dummy,totalLikes//mostBlogs,mostLikes
}