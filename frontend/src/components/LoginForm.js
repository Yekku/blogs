import React from 'react'
import { Button, Form } from "semantic-ui-react";

const LoginForm = (props) => {
  return (
      <div>
        <h2>Login to application</h2>

      <Form onSubmit={props.handleSubmit}>
          <Form.Field style={{width: 300}}>
          <label>Userame</label>
            <input
              type="text"
              name="username"
              value={props.username}
              onChange={props.handleChange}
              placeholder='Username'
            />
          </Form.Field>
        <Form.Field style={{ width: 300 }}>
          <label>Password</label>
            <input
              type="password"
              name="password"
              value={props.password}
              onChange={props.handleChange}
              placeholder='Password'
            />
          </Form.Field>
          <Button type="submit">login</Button>
        </Form>
      </div>
  
  )
}

export default LoginForm