import React from "react";
import { Link } from "react-router-dom";
import { List } from "semantic-ui-react";

const BlogList = props => {
  const byLikes = (b1, b2) => b2.likes - b1.likes

  const blogsInOrder = props.blogs.sort(byLikes)
  return <div>
      <h2>Blogs</h2>
      <List divided relaxed>
        {blogsInOrder.map(blog =>
          <List.Item key={blog.id}>
            <List.Icon name="book" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header as={Link} to={`/blogs/${blog.id}`}>
                {blog.title}
              </List.Header>
              <List.Description>By {blog.author}</List.Description>
            </List.Content>
          </List.Item>)}
      </List>
    </div>;
};

export default BlogList;
