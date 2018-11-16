const listHelper = require('../utils/list_helper')
const testData = require('./testData')

describe.skip('list helpers', () => {
  test('dummy is called', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe.skip('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(testData.noBlogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog', () => {
    const result = listHelper.totalLikes(testData.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list iclude all blogs', () => {
    const result = listHelper.totalLikes(testData.blogs)
    expect(result).toBe(36)
  })
})

describe.skip('favorite blog', () => {
  const newBlog = blog => {
    return { title: blog.title, author: blog.author, likes: blog.likes }
  }
  test('when list has only one blog return that blog', () => {
    const result = listHelper.favoriteBlog(testData.listWithOneBlog)
    expect(result).toEqual(newBlog(testData.listWithOneBlog[0]))
  })

  test('when list is empty return zero', () => {
    const result = listHelper.favoriteBlog(testData.noBlogs)
    expect(result).toEqual(0)
  })

  test('returns the blog with most likes', () => {
    const result = listHelper.favoriteBlog(testData.blogs)
    expect(result).toEqual(newBlog(testData.blogs[2]))
  })
})

describe.skip('most blogs', () => {

  test('only one blog return author of that blog', () => {
    const result = listHelper.mostBlogs(testData.listWithOneBlog)
    const author = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }
    expect(result).toEqual(author)
  })

  test('when list is empty return zero', () => {
    const result = listHelper.mostBlogs(testData.noBlogs)
    expect(result).toBe(0)
  })

  test('most written author and number of blogs', () => {
    const result = listHelper.mostBlogs(testData.blogs)
    const mostWrittenAuthor = { author: 'Robert C. Martin', blogs: 3 }
    expect(result).toEqual(mostWrittenAuthor)
  })
})

describe.skip('most likes', () => {

  test('only one blog retur author and likes', () => {
    const result = listHelper.mostLikes(testData.listWithOneBlog)
    const oneBlogAuthor = { author: 'Edsger W. Dijkstra', likes: 5 }
    expect(result).toEqual(oneBlogAuthor)
  })

  test('when list is empty return zero', () => {
    const result = listHelper.mostLikes(testData.noBlogs)
    expect(result).toBe(0)
  })

  test('favorite writer and sum of likes', () => {
    const result = listHelper.mostLikes(testData.blogs)
    const bestBlogger = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    expect(result).toEqual(bestBlogger)
  })
})
