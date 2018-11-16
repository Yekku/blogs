const dummy = (blogs) => {
  const reducer = (total, blog) => {
    return total + blog
  }
  return blogs.reduce(reducer, 1)
}

const totalLikes = (blogs) => {
  const reducer = (total, blog) => {
    return total + blog.likes
  }
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (favorite, blog) => {
    return (blog.likes > favorite.likes) ? blog : favorite
  }
  const newBlog = blog => {
    return {
      title: blog.title,
      author: blog.author,
      likes: blog.likes
    }
  }
  return blogs.length === 0 ? 0 : newBlog(blogs.reduce(reducer))
}

const mostBlogs = (blogs) => {
  const blogData = {}
  const mostBlogsWriter = {
    author: '',
    blogs: 0
  }

  blogs.forEach(blog => {
    const author = blog.author
    let hasBlogs

    blogData[author] ? hasBlogs = blogData[author] + 1 : hasBlogs = 1

    blogData[author] = hasBlogs

    if (hasBlogs > mostBlogsWriter.blogs) {
      mostBlogsWriter.author = author
      mostBlogsWriter.blogs = hasBlogs
    }
  })

  return blogs.length === 0 ? 0 : mostBlogsWriter
}

const mostLikes = (blogs) => {
  const blogData = {}
  const favoriteWriter = {
    author: '',
    likes: 0
  }

  blogs.forEach(blog => {
    const author = blog.author
    const likes = blog.likes
    let hasLikes

    blogData[author] ? hasLikes = blogData[author] + likes : hasLikes = likes

    blogData[author] = hasLikes

    if (hasLikes > favoriteWriter.likes) {
      favoriteWriter.author = author
      favoriteWriter.likes = hasLikes
    }
  })

  return blogs.length === 0 ? 0 : favoriteWriter
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
