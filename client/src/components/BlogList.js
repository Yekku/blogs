import React from 'react'
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export class BlogList extends React.Component {
  render() {
    return <div>
      <h2>Blogs</h2>
      <List>
        {this.props.blogs.map(blog => <List.Item key={blog._id}>
          <List.Icon name="book" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header as={Link} to={`/blogs/${blog._id}`}>
              {blog.title}
            </List.Header>
            <List.Description>By {blog.author}</List.Description>
          </List.Content>
        </List.Item>)}
      </List>
    </div>
  }
}

const mapStateToProps = (state) => {
  const byLikes = (b1, b2) => b2.likes - b1.likes
  const blogsInOrder = state.blogs.sort(byLikes)
  return {
    blogs: blogsInOrder,
  }
}

export default connect(mapStateToProps, null)(BlogList)
