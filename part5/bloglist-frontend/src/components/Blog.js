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
      return <button onClick = {() => removeBlog(blog)}>remove</button>
    }

  }

  return(
    <div>
      <div style={{ ...blogStyle, ...hideWhenVisible }}>
        {blog.title} {blog.author}
        <button onClick= {() => setViewVisible(true)}>view</button>
      </div>
      <div style = {{ ...blogStyle, ...showWhenVisible }}>

        {blog.title} {blog.author}
        <button onClick= {() => setViewVisible(false)}>hide</button><br/>
        {blog.url}<br/>
        {`likes ${blog.likes}`} <button onClick= {() => likesUpdate(blog)}>like</button><br/>
        {blog.user.name}<br/>
        { checkAuthorization()}
      </div>
    </div>
  )}

export default Blog
