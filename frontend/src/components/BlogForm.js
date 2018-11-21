import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { refreshUser } from '../reducers/userReducer'
import { notify } from '../reducers/notificationReducer'
import { Button, Form } from 'semantic-ui-react'

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: ''
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  };

  idByUsername = username => {
    return this.props.users.find(u => u.username === username)._id
  }

  addBlog = async (e) => {
    e.preventDefault()
    const newBlog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }
    try {
      this.setState({ title: '', author: '', url: '' })
      await this.props.createBlog(newBlog)
      await this.props.refreshUser(this.idByUsername(this.props.user.username))
      this.props.notify(`A new blog ${newBlog.title} created`, 5)
      this.props.hideBlogForm()
    } catch (exception) {
      this.props.notify('Unable to save the blog', 5)
    }
  };
  render() {
    return <div>
      <h2>Create new blog</h2>

      <Form onSubmit={this.addBlog}>
        <Form.Field style={{ width: 500 }}>
          <label htmlFor="title">New blog title </label>
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field style={{ width: 500 }}>
          <label htmlFor="author">New blog author </label>
          <input type="text" name="author" value={this.state.author} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field style={{ width: 500 }}>
          <label htmlFor="url">New blog url </label>
          <input type="text" name="url" value={this.state.url} onChange={this.handleChange} />
        </Form.Field>

        <Button size="mini" content="create" onClick={this.hideBlogForm} />
      </Form>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    user: state.login
  }
}

export default connect(
  mapStateToProps,
  { createBlog, notify, refreshUser }
)(BlogForm)