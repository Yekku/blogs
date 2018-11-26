import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
import { refreshUser } from '../reducers/userReducer'
import { initBlogs } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import { Button, Header, Segment, List, Form, Icon } from 'semantic-ui-react'

export class Blog extends React.Component {
  constructor() {
    super()
    this.state = {
      comment: ''
    }
  }

  fieldChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value })
  };

  idByUsername = username => {
    const { users } = this.props
    return users.find(u => u.username === username)._id
  };

  likeBlog = blog => async () => {
    try {
      await this.props.likeBlog(blog)
      await this.props.initBlogs()
      this.props.notify(`liked blog '${blog.title}'`, 5)
    } catch (exception) {
      this.props.notify('liking blog failed', 5)
    }
  };

  removeBlog = (removedBlog) => async () => {
    try {
      if (
        // eslint-disable-next-line no-alert
        window.confirm(
          `A you sure delete '${removedBlog.title}' ?`
        )
      ) {
        this.props.history.push('/blogs')
        await this.props.removeBlog(removedBlog)
        await this.props.refreshUser(this.idByUsername(this.props.user.username))
        this.props.notify(
          `A blog '${removedBlog.title}' deleted`,
          5
        )
      }
    } catch (exception) {
      this.props.notify('deleting a blog failed', 5)
    }
  };

  addComment = (blog) => async event => {
    event.preventDefault()
    try {
      await this.props.commentBlog(blog, this.state.comment)
      await this.props.initBlogs()
      this.setState({
        comment: ''
      })
      this.props.notify(
        `Comment '${this.state.comment}' added to blog '${blog.title}'`,
        5
      )
    } catch (exception) {
      this.props.notify('posting a comment failed', 5)
    }
  };

  render() {
    if (!this.props.blog) {
      return (
        <div>
          <Icon name="reply" size="small" /><Link to={'/blogs'}>Back to bloglist</Link>
        </div>
      )
    }
    return (
      <div>
        <div>
          <Icon name="reply" size="small" /><Link to={'/blogs'}>Back to bloglist</Link>
        </div>
        <Header as="h2" attached="top">
          {this.props.blog.title}
        </Header>
        <Segment attached>
          <p>By {this.props.blog.author}</p>
          <p>
            For more information see this <a href={this.props.blog.url} target="blanck">link</a>
          </p>
          <Button content="Like" icon="heart" onClick={this.likeBlog(this.props.blog)} label={{ basic: true, pointing: 'right', content: `${this.props.blog.likes}` }} labelPosition="left" size="mini" />
          <p style={{ marginTop: 10 }}>Added by {this.props.blog.user.name}</p>
          {(!this.props.blog.user || this.props.user.username === this.props.blog.user.username) &&
              <Button size="mini" type="button" onClick={this.removeBlog(this.props.blog)}>
                delete
              </Button>}
          <div>
            <h2>comments</h2>
            <List>
              {this.props.blog.comments.map(comment => (
                <List.Item key={comment}>
                  <List.Icon name="comments outline" />
                  <List.Content>
                    <List.Description>{comment}</List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
            <Form onSubmit={this.addComment(this.props.blog)}>
              <Form.Field>
                <label htmlFor="comment">
                  comment
                </label>
                <textarea name="comment" value={this.state.comment} onChange={this.fieldChangeHandler} style={{ width: 300, height: 100 }} />
              </Form.Field>
              <Button type="submit">Add comment</Button>
            </Form>
          </div>
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const users = state.users
  const user = state.login
  const blog = state.blogs.find(b => b._id === ownProps.id)
  return {
    users: users,
    user: user,
    blog: blog
  }
}

const mapDispatchToProps = {
  notify,
  removeBlog,
  likeBlog,
  commentBlog,
  refreshUser,
  initBlogs
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)
