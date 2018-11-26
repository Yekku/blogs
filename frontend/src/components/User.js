import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { List, Icon } from 'semantic-ui-react'

export class User extends React.Component {

  render() {
    const { user } = this.props
    return (
      <div>
        <div>
          <div>
            <Icon name="reply" size="small" /><Link to={'/users'}>Back to users</Link>
          </div>
        </div>
        <h2>{user.name}</h2>
        <h3>Added blogs</h3>
        <List>
          {user.blogs.map(blog => <List.Item key={blog._id}>
            <List.Icon name="book" />
            <List.Content>
              {blog.title}
            </List.Content>
          </List.Item>)}
        </List>
      </div>
    )
  }
}

User.propTypes = {
  id: PropTypes.string.isRequired,
  users: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
  const user = state.users.find(user => user._id === ownProps.id)
  return {
    user: user
  }
}

export default connect(mapStateToProps, null)(User)
