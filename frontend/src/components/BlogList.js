import React from 'react';
import Blog from '../components/Blog';

const BlogList = (props) => {
  const byLikes = (b1, b2) => b2.likes - b1.likes
  const blogsInOrder = props.blogs.sort(byLikes)
  return (
    <div className="blogs">
      <h2>blogs</h2>
      {blogsInOrder.map(blog => (
        
        <Blog
          key={blog.id}
          blog={blog}
          handleLikes={props.likeBlog(blog.id)}
          handleDelete={props.handleDelete(blog.id)}
          loggedUser={props.loggedUser}
        />
      ))}
    </div>
  )
}

export default BlogList
