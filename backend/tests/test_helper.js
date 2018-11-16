const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

const format = blog => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

const nonExistingId = async () => {
  const blog = new Blog()
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(Blog.format)
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(User.format)
}

const initialUsers = [
  {
    username: 'testuser',
    name: 'Test User',
    adult: true,
    password: 'salasana'
  },
  {
    username: 'superuser',
    name: 'Super User',
    adult: false,
    password: 'secret'
  }
]

const saveUser = async (user) => {
  const res = await api
    .post('/api/users')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  return res
}

const login = async (username, password) => {
  const res = await api
    .post('/api/login')
    .send({
      username,
      password
    })
  return res.body.token
}

const close = () => {
  server.close()
}

module.exports = {
  initialBlogs, format, nonExistingId, blogsInDb, usersInDb, initialUsers, saveUser, login, close
}