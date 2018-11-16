const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs')

  response.json(users.map(User.format))
})

usersRouter.get('/:id', async (request, response) => {
  let users
  try {
    users = await User.find({ '_id': request.params.id }).populate('blogs', { _id: 1, title: 1, author: 1, url: 1, likes: 1 })
  } catch (error) {
    response.status(404).json({ error: 'malformatted id' })
  }
  if (users.length <= 0) {
    response.status(404).json({ error: 'Could not find user with given id.' })
  }
  const user = {
    _id: users[0]._id,
    username: users[0].username,
    name: users[0].name,
    adult: users[0].adult,
    blogs: users[0].blogs
  }
  response.json(user)
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const existingUser = await User.find({ username: body.username })
    if (existingUser.length > 0) {
      return response.status(400).json({ error: 'username must be unique' })
    } else if (body.username.length < 3) {
      return response.status(400).json({ error: 'username must be atleast 3 characters' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
      adult: body.adult ? body.adult : true
    })

    const savedUser = await user.save()

    response.json(User.format(savedUser))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = usersRouter