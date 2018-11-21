import React from 'react'
import { connect } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { login } from '../reducers/loginReducer'
import { notify } from '../reducers/notificationReducer'
import { Button, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class LoginForm extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  };

  handleSubmit = async event => {
    event.preventDefault()
    const { username, password } = this.state
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.props.notify(`Welcome back ${user.name} !`, 5)
      this.setState({ username: '', password: '' })
      await this.props.login(user)
    } catch (exception) {
      this.props.notify('Wrong username or password', 5)
    }
  }

  render() {
    return (
      <div>
        <h2 style={{ marginTop: 20 }}>Login to application</h2>

        <Form onSubmit={this.handleSubmit}>
          <Form.Field style={{ width: 300 }}>
            <label>Userame</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              placeholder="Username"
            />
          </Form.Field>
          <Form.Field style={{ width: 300 }}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Password"
            />
          </Form.Field>
          <Button.Group>
            <Button positive type="submit">
              Login
            </Button>
            <Button.Or />
            <Button as={Link} to={'/create-new-user'}>
              Create new user
            </Button>
          </Button.Group>
        </Form>
      </div>
    )
  }
}

export default connect(null, { login, notify })(LoginForm)
