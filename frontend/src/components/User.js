import React from "react";
import { List } from "semantic-ui-react";
import { Link } from "react-router-dom";

const User = ({ user }) => {
  if (!user) {
    return null;
  }

  const blogs = user.blogs.map(blog => <List.Item key={blog._id}>
      <List.Icon name="book" />
      <List.Content as={Link} to={`/blogs/${blog._id}`}>
        {blog.title}
      </List.Content>
    </List.Item>);
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <List divided>
        {blogs}
      </List>
    </div>
  );
};

export default User
