import React, { useState } from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props ,ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const changeVisibility = (ref, () => {
    toggleVisibility()

  })
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={changeVisibility}>{props.buttonLabel}</button>

        {props.blogs.sort((blog1,blog2) => blog2.likes-blog1.likes).map(blog =>
          <Blog key={blog.id} blog={blog} user = {props.user} likesUpdate =  {props.likesUpdate} removeBlog = {props.removeBlog}/>
        )}
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={changeVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable