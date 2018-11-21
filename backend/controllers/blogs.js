const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { id: 1, username: 1, name: 1 })
  response.json(blogs.map(Blog.format))
})

blogsRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)

    if (blog) {
      response.json(Blog.format(blog))
    } else {
      response.status(404).end()
    }

  } catch (exception) {
    console.log(exception)
    response.status(400).send({
      error: 'malformatted id'
    })
  }
})

blogsRouter.post('/', async (request, response) => {
  try {

    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response
        .status(401)
        .json({ error: 'token missing or invalid' })
    }

    if (body.title === '' || body.url === '') {
      return response.status(400).json({
        error: 'title and/or url missing'
      })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      comments: body.comments === undefined ? [] : body.comments,
      user: user._id
    });

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    const populatedBlog = await Blog.findById(savedBlog._id).populate('user', {
      id: 1,
      username: 1,
      name: 1
    })

    response.json(Blog.format(populatedBlog))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if (!user || !blog.user || user.id.toString() !== blog.user.toString()) {
      return response.status(400).json({ error: 'Invalid user' })
    }
    await Blog.findByIdAndRemove(request.params.id)

    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({
      error: 'malformatted id'
    })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      comments: body.comments
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    })
    const populatedBlog = await Blog.findById(updatedBlog.id).populate('user', {
      id: 1,
      username: 1,
      name: 1
    })
    response.json(Blog.format(populatedBlog))
  } catch (exception) {
    console.log(exception)
    response.status(400).send({
      error: 'malformatted id'
    })
  }
})

module.exports = blogsRouter
