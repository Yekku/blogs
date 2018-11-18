import React from 'react'
import { Form, Button } from "semantic-ui-react"
import { Link } from "react-router-dom";

class NewUserForm extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      name: '',
      password: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNewUser({
      username: this.state.username,
      name: this.state.name,
      password: this.state.password
    })
    this.props.history.push('/')
    this.setState({ 
      username: '',
      name: '',
      password: ''
     });
  }

  render() {
    return <div style={{marginTop: 20}}>
        <h2>Create a new user</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field style={{ width: 300 }}>
            <label htmlFor="username">Username</label>
            <input name="username" value={this.state.username} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field style={{ width: 300 }}>
            <label htmlFor="name">Name</label>
            <input name="name" value={this.state.name} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field style={{ width: 300 }}>
            <label htmlFor="password">Password</label>
            <input name="password" value={this.state.password} onChange={this.handleChange} />
          </Form.Field>
        <Button.Group>
          <Button positive type="submit">Create</Button>
          <Button.Or />
          <Button as={Link} to={`/`}>Cancel</Button>
        </Button.Group>
        </Form>
      </div>;

  }
}

export default NewUserForm
