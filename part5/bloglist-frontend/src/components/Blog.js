import React, { useState } from 'react'

const Blog = ({ blog, user, likesUpdate, removeBlog }) => {
  const [viewVisible, setViewVisible] = useState(false)
  const hideWhenVisible = { display: viewVisible ? 'none' : '' }
  const showWhenVisible = { display: viewVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const checkAuthorization = () => {

    if (blog.user.username === user.username) {
      return <button onClick = {removeBlog} value = {blog.id}>remove</button>
    }

  }

  return(
    <div className= 'blog'>
      <div className= 'partialBlog' style={{ ...blogStyle, ...hideWhenVisible }}>
        {blog.title} by {blog.author}
        <button onClick= {() => setViewVisible(true)}>view</button>
      </div>
      <div className = 'fullBlog' style = {{ ...blogStyle, ...showWhenVisible }}>

        {blog.title} by {blog.author}
        <button onClick= {() => setViewVisible(false)}>hide</button><br/>
        {blog.url}<br/>
        {`likes ${blog.likes}`} <button onClick= {likesUpdate} value = {blog.id}>like</button><br/>
        {blog.user.name}<br/>
        { checkAuthorization()}
      </div>
    </div>
  )}

export default Blog
