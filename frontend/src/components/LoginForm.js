import React from 'react'

const LoginForm = (props) => {
  return (
      <div>
        <h2>Login to application</h2>

      <form onSubmit={props.handleSubmit}>
          <div>
            Username:
            <input
              type="text"
              name="username"
              value={props.username}
              onChange={props.handleChange}
            />
          </div>
          <div>
            Password:
            <input
              type="password"
              name="password"
              value={props.password}
              onChange={props.handleChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
  
  )
}

export default LoginForm