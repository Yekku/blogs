import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom"
import { Container } from "semantic-ui-react"
import NavMenu from './components/NavMenu'
import About from './components/About'
import Notification from './components/Notification'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogList from "./components/BlogList"
import User from './components/User'
import UsersList from './components/UserList'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      users: [],
      title: "",
      author: "",
      url: "",
      error: null,
      success: null,
      username: "",
      password: "",
      user: null
    };
  }

  componentDidMount() {
    blogService.getAll().then(blogs => this.setState({ blogs }));
    userService.getAll().then(users => this.setState({ users }));
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      this.setState({ user });
      blogService.setToken(user.token);
    }
  }

  login = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      this.setState({
        username: "",
        password: "",
        user
      });
    } catch (exception) {
      this.setState({
        error: "wrong username or password"
      });
      setTimeout(() => {
        this.setState({ error: null });
      }, 5000);
    }
  };

  handleBlogFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addBlog = async event => {
    event.preventDefault();
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
      user: this.state.user
    };
    this.blogForm.toggleVisibility();
    let newBlog = await blogService.create(blogObject);
    newBlog = { ...newBlog, user: this.state.user };
    this.setState({
      blogs: this.state.blogs.concat(newBlog),
      title: "",
      url: "",
      author: "",
      success: `a new blog ${this.state.title} by ${
        this.state.user.username
      } added`
    });
    setTimeout(() => {
      this.setState({ success: null });
    }, 5000);
  };

  deleteBlog = id => {
    return async () => {
      const blog = this.state.blogs.find(b => b.id === id);

      try {
        if (window.confirm(`are you sure delete '${blog.title}'`)) {
          if (this.state.user.name !== blog.user.name) {
            this.setState({ error: "only creator can remove a blog" });
            setTimeout(() => {
              this.setState({ error: null });
            }, 5000);
          } else {
            await blogService.remove(id);

            this.setState({
              blogs: this.state.blogs.filter(blog => blog.id !== id),
              success: `removed blog '${blog.title}'`
            });
            setTimeout(() => {
              this.setState({ success: null });
            }, 5000);
          }
        }
      } catch (exception) {
        this.setState({ error: "something went wrong" });
        setTimeout(() => {
          this.setState({ error: null });
        }, 5000);
      }
    };
  };

  handleLoginFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLogoutButton = () => {
    this.setState({
      user: null
    });
    window.localStorage.removeItem("loggedBlogappUser");
  };

  likeBlog = id => {
    return async () => {
      try {
        const blog = this.state.blogs.find(b => b.id === id);
        let blogObject = {
          ...blog,
          likes: blog.likes + 1
        };
        if (blog.user) {
          blogObject = { ...blogObject, user: blog.user._id };
        }

        let updatedBlog = await blogService.update(id, blogObject);
        if (blog.user) {
          updatedBlog = { ...updatedBlog, user: blog.user };
        }
        this.setState({
          blogs: this.state.blogs.map(blog =>
            blog.id !== id ? blog : updatedBlog
          )
        });
      } catch (exception) {
        console.log("error: something went wrong");
      }
    };
  };

  render() {

    const userById = id => {
      return this.state.users.find(user => user.id === id);
    };

    const blogById = id => {
      return this.state.blogs.find(blog => blog.id === id);
    };
    
    const blogForm = () => (
      <Togglable
        buttonLabel="New Blog"
        ref={component => (this.blogForm = component)}
      >
        <BlogForm
          addBlog={this.addBlog}
          title={this.state.title}
          author={this.state.author}
          url={this.state.url}
          handleChange={this.handleBlogFieldChange}
        />
      </Togglable>
    );

    if (this.state.user === null) {
      return (
        <Container>
          <div>
            <Notification.Alert message={this.state.error} />
            <LoginForm
              handleSubmit={this.login}
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleLoginFieldChange}
            />
          </div>
        </Container>
      );
    } else {
      return <Container>
          <Router>
            <div>
              <div>
                <Notification.Success message={this.state.success} />
              </div>
              <div>
                <NavMenu handleLogoutButton={this.handleLogoutButton} username={this.state.user.name} />
              </div>
              <div>
                {blogForm()}
                </div>
              <div>
                <Route exact path="/blogs" render={() => <BlogList blogs={this.state.blogs} likeBlog={this.likeBlog} handleDelete={this.handleDelete} loggedUser={this.state.user} />} />
                <Route exact path="/blogs/:id" render={({ match }) => <Blog blog={blogById(match.params.id)} likeBlog={this.likeBlog} loggedUser={this.state.user} clickHandle={this.deleteBlog} />} />
                <Route exact path="/users" render={() => <UsersList users={this.state.users} />} />
                <Route exact path="/users/:id" render={({ match }) => <User user={userById(match.params.id)} />} />
                <Route exact path="/about" render={() => <About />} />
              </div>
              <div>
                <Footer />
              </div>
            </div>
          </Router>
        </Container>;
    }
  }
}

export default App
