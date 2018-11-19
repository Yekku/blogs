import React from "react";
import { Button, Header, Segment, List } from "semantic-ui-react"
import CommentForm from './CommentForm'

const Blog = ({ blog, likeBlog, commentBlog, clickHandle, loggedUser }) => {
  if (!blog) {
    return null;
  }

  const likes = `${blog.likes}`
  const comments = blog.comments.map(comment => <List.Item key={comment}>
      <List.Icon name="comments outline"/>
      <List.Content>{comment}</List.Content>
    </List.Item>);

  const showDeleteButton = {
    display: blog.user.username === loggedUser.username ? "" : "none"
  };

  return <div>
      <Header as="h2" attached="top">
        {blog.title}
      </Header>
      <Segment attached>
        <p>By {blog.author}</p>
        <p>
          For more information see this <a href={blog.url} target="blanck">
            link
          </a>
        </p>
        <Button content="Like" icon="heart" onClick={likeBlog(blog.id)} label={{ basic: true, pointing: "right", content: likes }} labelPosition="left" size="mini" />
        <p style={{ marginTop: 10 }}>Added by {blog.user.username}</p>
        <Button onClick={clickHandle(blog.id)} style={showDeleteButton} size="mini" content="Delete Blog" />
        <h3>Comments</h3>
        <List>{comments}</List>
        <CommentForm handleComment={commentBlog}/>
        
      </Segment>
    </div>;
};

export default Blog
