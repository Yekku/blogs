import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Menu } from 'semantic-ui-react'

export default class NavMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'home'
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item as={Link} to={`/blogs`}>
          <h2>Blog app</h2>
        </Menu.Item>
          <Menu.Item
          as={Link} to={`/blogs`}
            name='Blogs'
            active={activeItem === 'Blogs'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
          as={Link} to={`/users`}
            name='Users'
            active={activeItem === 'Users'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link} to={`/about`}
            name='About'
            active={activeItem === 'About'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item>
              Logged in as {this.props.username}
            </Menu.Item>
            <Menu.Item
              name='Logout'
              active={activeItem === 'Logout'}
              onClick={this.props.handleLogoutButton}
            />
          </Menu.Menu>
        </Menu>

      </div>
    )
  }
}
