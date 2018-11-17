import React from 'react'
import { Button, Form } from "semantic-ui-react";

    const BlogForm = (props) => {
      return (
      <div>
        <h2>Create new blog</h2>

        <Form onSubmit={props.addBlog}>
            <Form.Field style={{ width: 500 }}>
              <label htmlFor="title">New blog title </label>
            <input
              type="text"
              name="title"
              value={props.title}
              onChange={props.handleChange}
            />
          </Form.Field>
            <Form.Field style={{ width: 500 }}>
              <label htmlFor="author">New blog author </label>
            <input
              type="text"
              name="author"
              value={props.author}
              onChange={props.handleChange}
            />
          </Form.Field>
            <Form.Field style={{ width: 500 }}>
              <label htmlFor="url">New blog url </label>
            <input
              type="text"
              name="url"
              value={props.url}
              onChange={props.handleChange}
            />
          </Form.Field>

          <Button size='mini' content='create'/>
        </Form>
      </div>
      )
    }

export default BlogForm