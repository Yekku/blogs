import React from 'react'

    const BlogForm = (props) => {
      return (
      <div>
        <h2>Create new blog</h2>

        <form onSubmit={props.addBlog}>
          <div>
              <label htmlFor="title">New blog title </label>
            <input
              type="text"
              name="title"
              value={props.title}
              onChange={props.handleChange}
            />
          </div>
          <div>
              <label htmlFor="author">New blog author </label>
            <input
              type="text"
              name="author"
              value={props.author}
              onChange={props.handleChange}
            />
          </div>
          <div>
              <label htmlFor="url">New blog url </label>
            <input
              type="text"
              name="url"
              value={props.url}
              onChange={props.handleChange}
            />
          </div>

          <button>create</button>
        </form>
      </div>
      )
    }

export default BlogForm