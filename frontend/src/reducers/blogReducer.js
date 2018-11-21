import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'CREATE': {
    return [...state, action.data]
  }
  case 'REMOVE': {
    const filtered = state.filter((b) => b._id !== action.data._id)
    return [...filtered]
  }
  case 'UPDATE': {
    const filtered = state.filter((b) => b._id !== action.data._id)
    return [...filtered, action.data]
  }
  default:
    return state
  }
}

const createBlog = (blog) => async (dispatch) => {
  const newBlog = await blogService.create(blog)
  dispatch({
    type: 'CREATE',
    data: newBlog
  })
}

const removeBlog = (blog) => async (dispatch) => {
  await blogService.remove(blog)
  dispatch({
    type: 'REMOVE',
    data: blog
  })
}

const likeBlog = (blog) => async (dispatch) => {
  const likedBlog = { ...blog }
  likedBlog.likes += 1
  const updatedBlog = await blogService.update(likedBlog)
  dispatch({
    type: 'UPDATE',
    data: updatedBlog
  })
}

const commentBlog = (blog, comment) => async (dispatch) => {
  const commentedBlog = { ...blog }
  commentedBlog.comments = [...commentedBlog.comments, comment]
  const updatedBlog = await blogService.update(commentedBlog)
  dispatch({
    type: 'UPDATE',
    data: updatedBlog
  })
}

const initBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll()
  dispatch({
    type: 'INIT_BLOGS',
    data: blogs
  })
}

export default reducer
export { createBlog, removeBlog, likeBlog, initBlogs, commentBlog }