import React, { useState } from 'react'
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
        <button id = 'newBlog-button' onClick={changeVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button id = 'cancel-button' onClick={changeVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable