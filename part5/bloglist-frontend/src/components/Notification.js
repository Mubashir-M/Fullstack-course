import React from 'react'
import '../App.css'

const Notification = ({ errorMessage,successMessage }) => {
  if (errorMessage === null && successMessage === null) {
    return null
  } else if (successMessage !== null) {
    return (
      <div className="success">
        {successMessage}
      </div>
    )
  } else {
    return (
      <div className="error">
        {errorMessage}
      </div>
    )
  }
}

export default Notification