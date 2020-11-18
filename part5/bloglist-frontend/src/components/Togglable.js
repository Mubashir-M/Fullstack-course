import React, { useState } from 'react'
import Blog from './Blog'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)
  

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  
  
        
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        {props.blogs.sort((blog1,blog2) => blog2.likes-blog1.likes).map(blog =>
        <Blog key={blog.id} blog={blog} user = {props.user} likesUpdate =  {props.likesUpdate} removeBlog = {props.removeBlog}/>
        
      )}
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable