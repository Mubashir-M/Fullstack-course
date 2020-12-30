import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  setUsername,
  setPassword,
  handleLogin,
  username,
  password
}) => (
  <div>
    <h2>Log in to application</h2>
    <form onSubmit = {handleLogin}>
      <div>
          username
        <input
          id = 'username'
          type = "text"
          value = {username}
          name = "Username"
          onChange = {({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
          password
        <input
          id = 'password'
          type = "text"
          value = {password}
          name = "Password"
          onChange = {({ target }) => setPassword(target.value)}
        />
      </div>
      <button id = 'login-button' type = "submit">login</button>
    </form>
  </div>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm