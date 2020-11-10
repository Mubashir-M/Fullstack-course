import React, { useState } from 'react';
import blogService from '../services/blogs'

const Blog = ({ blog}) => {
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

  const likesUpdate = () => {
    
    const newBlog = {
      title : blog.title,
      author: blog.author,
      url : blog.url,
      likes: blog.likes+1,
      user:blog.user.id,
      id: blog.id
      
    }
    
    blogService
      .update(newBlog)
      .then(returnedBlog => {
        
      })       
  }
  
  return(
   <div>
     <div style={{...blogStyle, ...hideWhenVisible}}>
        {blog.title} {blog.author} 
        <button onClick= {() => setViewVisible(true)}>view</button>
      </div>
      <div style = {{...blogStyle, ...showWhenVisible}}>
      
        {blog.title} {blog.author}
        <button onClick= {() => setViewVisible(false)}>hide</button><br/>
        {blog.url}<br/>
        {`likes ${blog.likes}`} <button onClick= {likesUpdate}>like</button><br/>
        {blog.user.name}

      </div>
   </div> 
  
)}

export default Blog
