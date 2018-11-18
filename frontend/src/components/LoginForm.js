import React from 'react'
import { Button, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";

class LoginForm extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.login({
      username: this.state.username,
      password: this.state.password
    })
    // this.props.history.push('/blogs')
    this.setState({
      username: '',
      password: ''
    })
  }

  render() {
  
  return (
      <div>
        <h2>Login to application</h2>

      <Form onSubmit={this.handleSubmit}>
          <Form.Field style={{width: 300}}>
          <label>Userame</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              placeholder='Username'
            />
          </Form.Field>
        <Form.Field style={{ width: 300 }}>
          <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder='Password'
            />
          </Form.Field>
        <Button.Group>
          <Button positive type="submit">Login</Button>
          <Button.Or />
          <Button as={Link} to={`/create-new-user`}>Create new user</Button>
        </Button.Group>
          
        </Form>
      </div>
  
  )
  }

}

export default LoginForm