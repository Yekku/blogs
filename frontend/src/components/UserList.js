import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

class UserList extends React.Component {
  render () {
    const users = this.props.users.map(user => (
      <Table.Row key={user._id}>
        <Table.Cell>
          <Link to={`/users/${user._id}`}>{user.name}</Link>
        </Table.Cell>
        <Table.Cell>{user.blogs.length}</Table.Cell>
      </Table.Row>
    ))

    return (
      <div className="users">
        <h2>Users</h2>
        <Table collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <h3>User name</h3>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <h3>Blogs</h3>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{users}</Table.Body>
        </Table>
      </div>
    )
  }
}

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      adult: PropTypes.bool.isRequired,
      blogs: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          author: PropTypes.string.isRequired,
          likes: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired
        }).isRequired
      ).isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
}

const mapStateToProps = (state) => {
  return { users: state.users }
}

export default connect(mapStateToProps, null)(UserList)