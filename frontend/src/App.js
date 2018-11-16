import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
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
    if (event.target.name === "title") {
      this.setState({ title: event.target.value });
    } else if (event.target.name === "author") {
      this.setState({ author: event.target.value });
    } else if (event.target.name === "url") {
      this.setState({ url: event.target.value });
    }
  };

  addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
      user: this.state.user
    };
    this.blogForm.toggleVisibility();
    let newBlog = await blogService.create(blogObject)
    newBlog = { ...newBlog, user: this.state.user }
      this.setState({
        blogs: this.state.blogs.concat(newBlog),
        title: "",
        url: "",
        author: "",
        success: `a new blog ${this.state.title} by ${this.state.user.username} added`
      });
      setTimeout(() => {
        this.setState({ success: null });
      }, 5000);
  };

  handleDelete = id => {
    return async () => {
      const blog = this.state.blogs.find(b => b.id === id);

      try {
        if (window.confirm(`are you sure delete '${blog.title}'`)) {
          if(this.state.user.name !== blog.user.name) {
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

  likeBlog = (id) => {
    return async () => {
      try {
        const blog = this.state.blogs.find(b => b.id === id);
        let blogObject = {
          ...blog,
          likes: blog.likes + 1
        }
        if (blog.user) {
          blogObject = { ...blogObject, user: blog.user._id }
        }

        let updatedBlog = await blogService.update(id, blogObject)
        if (blog.user) {
          updatedBlog = { ...updatedBlog, user: blog.user }
        }
          this.setState({
            blogs: this.state.blogs.map(blog => blog.id !== id ? blog : updatedBlog)
          })
      } catch (exception) {
        console.log("error: something went wrong");
      }
    }
  };

  render() {
    const blogsToShow = this.state.blogs.slice(0)
      blogsToShow.sort((a, b) => b.likes - a.likes)
    const blogForm = () => (
      <Togglable
        buttonLabel="new blog"
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
        <div>
          <Notification.Alert message={this.state.error} />
          <LoginForm
            handleSubmit={this.login}
            username={this.state.username}
            password={this.state.password}
            handleChange={this.handleLoginFieldChange}
          />
        </div>
      );
    } else {

      return <div>
        <Notification.Success message={this.state.success} />
        <div>
          <p>{this.state.user.name} logged in</p>
          <button onClick={this.handleLogoutButton}>logout</button>
          {blogForm()}
        </div>
        <h2>Blogs</h2>
        <div>
        {blogsToShow.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLikes={this.likeBlog(blog.id)}
            handleDelete={this.handleDelete(blog.id)}
            loggedUser={this.state.user}
          />
        ))}
      </div>
      </div>;
    }
  }
}

export default App
