import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { notify } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

class NavMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'home'
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  logoutHandler = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    this.props.logout()
    this.props.notify('You just logged out!', 3)
  }

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item as={Link} to={'/'}>
            <h2>Blog app</h2>
          </Menu.Item>
          <Menu.Item
            as={Link} to={'/'}
            name='Home'
            active={activeItem === 'Home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link} to={'/blogs'}
            name='Blogs'
            active={activeItem === 'Blogs'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link} to={'/users'}
            name='Users'
            active={activeItem === 'Users'}
            onClick={this.handleItemClick}
          />

          <Menu.Menu position='right'>
            <Menu.Item>
              <em>Logged in as {this.props.user.name}</em>
            </Menu.Item>
            <Menu.Item
              as={Link} to={'/'}
              name='Logout'
              active={activeItem === 'Logout'}
              onClick={this.logoutHandler}
            />
          </Menu.Menu>
        </Menu>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const users = state.users
  const user = state.login

  return { users, user }

}

export default connect(
  mapStateToProps,
  { notify, logout }
)(NavMenu)
