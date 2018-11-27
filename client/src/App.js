import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import Sky from 'react-sky'
import NavMenu from './components/NavMenu'
import Home from './components/Home'
import Notification from './components/Notification'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import NewUserForm from './components/NewUserForm'
import User from './components/User'
import UsersList from './components/UserList'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import blogService from './services/blogs'
import { notify } from './reducers/notificationReducer'
import { initUsers } from './reducers/userReducer'
import { initBlogs } from './reducers/blogReducer'
import { login } from './reducers/loginReducer'
import './App.css'

const imagesPath = process.env.PUBLIC_URL + '/images/'

export class App extends React.Component {

  componentDidMount() {
    this.props.initBlogs()
    this.props.initUsers()
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.props.login(user)
      blogService.setToken(user.token)
    }
  }

  hideBlogForm = () => {
    this.blogForm.toggleVisibility()
  }

  render() {
    if (this.props.user === null) {
      return <Container>
        <Router>
          <div style={{
            paddingTop: 30,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
          }}>
            <Sky
              images={{
                /* FORMAT AS FOLLOWS */
                0: `${imagesPath}Blogging.png`  /* You can pass as many images as you want */
                /* 1: `${imagesPath}blog.png` */
                /*2: myImage /* you can pass images in any form: link, imported via webpack... */
                /* 3: your other image... */
                /* 4: your other image... */
                /* 5: your other image... */
                /* ... */
              }}
              how={130} /* Pass the number of images Sky will render chosing randomly */
              time={40} /* time of animation */
              size={'100px'} /* size of the rendered images */
              background={'palettedvioletred'} /* color of background */
            />
            <Notification />
            <LoginForm />
            <Route exact path="/create-new-user" render={({ history }) => <NewUserForm history={history} />} />
          </div>
        </Router>
      </Container>
    } else {
      return <Container>
        <Router>
          <div style={{ paddingTop: 30 }}>
            <div>
              <Notification />
            </div>
            <div>
              <NavMenu />
            </div>
            <div>
              <Togglable
                buttonLabel="New Blog"
                ref={(component) => {this.blogForm = component}}
              >
                <BlogForm hideBlogForm={this.hideBlogForm} />
              </Togglable>
            </div>
            <div>
              <Route exact path="/" render={() => <Home />} />
              <Route exact path="/blogs" render={() => <BlogList />} />
              <Route exact path="/blogs/:id" render={({ match, history }) => <Blog id={match.params.id} history={history} />} />
              <Route exact path="/users" render={() => <UsersList />} />
              <Route exact path="/users/:id" render={({ match }) => <User id={match.params.id} />} />
            </div>
            <div>
              <Footer />
            </div>
          </div>
        </Router>
      </Container>
    }
  }
}

const mapStateToProps = (state) => {
  const users = state.users
  const user = state.login
  return {
    users: users,
    user: user
  }
}

export default connect(mapStateToProps,
  { notify,
    initBlogs,
    initUsers,
    login
  })(App)
