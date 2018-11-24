const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  saveUser,
  login
} = require('./test_helper')

describe('blogs api', async () => {
  describe('when there is initially some blogs saved', async () => {
    let token
    beforeAll(async () => {
      await Blog.remove({})
      await User.remove({})

      let blog = new Blog(initialBlogs[0])
      await blog.save()

      blog = new Blog(initialBlogs[1])
      await blog.save()
    })

    beforeEach(async () => {
      await User.remove({})
      const user = {
        username: 'root',
        name: 'Root',
        password: 'secret'
      }
      await saveUser(user)
      token = await login('root', 'secret')
    })

    test('all blogs are returned as json by GET /api/blogs', async () => {
      const blogsInDatabase = await blogsInDb()

      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body.length).toBe(blogsInDatabase.length)

      const returnedTitles = response.body.map(b => b.title)
      blogsInDatabase.forEach(blog => {
        expect(returnedTitles).toContain(blog.title)
      })
    })

    test('individual blog are returned as json by GET /api/blogs/:id', async () => {
      const blogsInDatabase = await blogsInDb()
      const aBlog = blogsInDatabase[0]

      const response = await api
        .get(`/api/blogs/${aBlog._id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body.title).toBe(aBlog.title)
    })

    test('404 returned by GET /api/blogs/:id with nonexisting valid id', async () => {
      const validNonexistingId = await nonExistingId()

      const response = await api
        .get(`/api/notes/${validNonexistingId}`)
        .expect(404)

      expect(response.body.error).toBe('unknown endpoint')
    })

    test('400 is returned by GET /api/blogs/:id with invalid id', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      const response = await api.get(`/api/blogs/${invalidId}`).expect(400)

      expect(response.body.error).toBe('malformatted id')
    })

    describe('addition of a new blog', async () => {
      test('POST /api/blogs succeeds with valid data', async () => {
        const blogsBefore = await blogsInDb()

        const testBlog = new Blog({
          title: 'React patterns',
          author: 'Michael Chan',
          url: 'https://reactpatterns.com/',
          likes: 7
        })

        await api
          .post('/api/blogs')
          .set('Authorization', 'bearer ' + token)
          .send(testBlog)
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const blogsAfter = await blogsInDb()

        expect(blogsAfter.length).toBe(blogsBefore.length + 1)

        const titles = blogsAfter.map(b => b.title)
        expect(titles).toContain('React patterns')
      })

      test('POST /api/blogs succeeds and likes set for 0', async () => {
        const newBlog = {
          title: 'Canonical string reduction',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
        }

        const blogsBeforPost = await blogsInDb()
        const likesBeforePost = blogsBeforPost.map(b => b.likes)

        expect(likesBeforePost).not.toContain(0)

        await api
          .post('/api/blogs')
          .set('Authorization', 'bearer ' + token)
          .send(newBlog)
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const blogsAfterPost = await blogsInDb()

        const titles = blogsAfterPost.map(b => b.title)
        expect(titles).toContainEqual('Canonical string reduction')

        const likesAfterPost = blogsAfterPost.map(b => b.likes)
        expect(likesAfterPost).toContain(0)
      })

      test('POST /api/blogs fails with proper statuscode if title and/or url is missing', async () => {
        const newBlog = { author: 'Michael Chan', likes: 7 }

        const blogsAtStart = await blogsInDb()

        await api
          .post('/api/blogs')
          .set('Authorization', 'bearer ' + token)
          .send(newBlog)
          .expect(400)

        const blogsAfterOperation = await blogsInDb()

        expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
      })
    })

    describe('updating of a blog', async () => {
      let addedBlog

      beforeAll(async () => {
        addedBlog = new Blog({
          title: 'Update blog pyynnöllä HTTP PUT',
          author: 'Yekku',
          url: 'http://localhost',
          likes: 1,
          comments: []
        })
        await addedBlog.save()
      })
      test('PUT /api/blogs/:id succeeds and likes updated', async () => {
        const blogsBeforePut = await blogsInDb()

        const newBlog = {
          title: 'Update blog Title',
          author: 'Yekku',
          url: 'http://localhost:3003/api/blogs',
          likes: 2
        }

        await api
          .put(`/api/blogs/${addedBlog._id}`)
          .set('Authorization', 'bearer ' + token)
          .send(newBlog)
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const blogsAfterPut = await blogsInDb()

        expect(blogsAfterPut.length).toBe(blogsBeforePut.length)

        const titles = blogsAfterPut.map(b => b.title)
        expect(titles).toContain(newBlog.title)

        const urls = blogsAfterPut.map(b => b.url)
        expect(urls).toContain(newBlog.url)

        const likesAfterPut = blogsAfterPut.map(b => b.likes)
        expect(likesAfterPut).toContain(newBlog.likes)
      })

      test('PUT /api/blogs/:id succeeds and new comment added', async () => {
        const updatedBlog = {
          title: 'Blog for comment',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com',
          likes: 2,
          comments: ['I like this post!']
        }

        const blogsBeforePut = await blogsInDb()

        await api
          .put(`/api/blogs/${addedBlog._id}`)
          .set('Authorization', 'bearer ' + token)
          .send(updatedBlog)
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const blogsAfterPut = await blogsInDb()

        expect(blogsAfterPut.length).toBe(blogsBeforePut.length)
        expect(blogsAfterPut).not.toEqual(blogsBeforePut)

      })

      test('400 is returned by PUT /api/blogs/:id with invalid id', async () => {
        const blogsBeforePut = await blogsInDb()

        const newBlog = {
          title: 'Update blog Title',
          author: 'Yekku',
          url: 'http://localhost:3003/api/blogs',
          likes: 2
        }

        await api
          .put('/api/blogs/12345')
          .send(newBlog)
          .expect(400)

        const blogsAfterPut = await blogsInDb()
        expect(blogsAfterPut).toEqual(blogsBeforePut)
      })
    })

    describe('deletion of a blog', async () => {
      test('DELETE /api/blogs/:id succeeds with proper statuscode', async () => {
        const newBlog = {
          title: 'Type wars',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
          likes: 2
        }

        const res = await api
          .post('/api/blogs')
          .set('Authorization', 'bearer ' + token)
          .send(newBlog)
          .expect(200)

        const blogsBeforeDelete = await blogsInDb()

        const id = res.body._id

        await api
          .delete('/api/blogs/' + id)
          .set('Authorization', 'bearer ' + token)
          .expect(204)

        const blogsAfterDelete = await blogsInDb()

        const titles = blogsAfterDelete.map(blog => blog.title)

        expect(titles).not.toContain(newBlog.title)
        expect(blogsAfterDelete.length).toBe(blogsBeforeDelete.length - 1)
      })
    })
  })
})

describe('users api', () => {
  describe('when there is initially one user at db', async () => {
    beforeAll(async () => {
      await User.remove({})

      const user = new User({
        username: 'testuser',
        name: 'Test User',
        adult: false
      })

      await user.save()
    })

    describe('addition succeeds', async () => {
      test('POST /api/users succeeds with a fresh username', async () => {
        const usersBeforeOperation = await usersInDb()

        const newUser = {
          username: 'yekku',
          name: 'Yekku',
          password: 'salainen'
        }

        await api
          .post('/api/users')
          .send(newUser)
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
        const usernames = usersAfterOperation.map(u => u.username)
        expect(usernames).toContain(newUser.username)
      })

      test('POST /api/users succeeds with a parametr aduls: true', async () => {
        const usersBeforeOperation = await usersInDb()

        const newUser = {
          username: 'newuser',
          name: 'New User',
          password: 'secret'
        }

        const res = await api
          .post('/api/users')
          .send(newUser)
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)

        const savedUser = await User.findById(res.body._id)
        expect(savedUser.adult).toEqual(true)
      })
    })

    describe('addition fails', async () => {
      test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
        const usersBeforeOperation = await usersInDb()

        const newUser = {
          username: 'testuser',
          name: 'Superuser',
          password: 'salainen'
        }

        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(result.body).toEqual({ error: 'username must be unique' })

        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
      })

      test('POST /api/users fails with proper statuscode and message if username < 3 characters', async () => {
        const usersBeforeOperation = await usersInDb()

        const newUser = {
          username: 'ro',
          name: 'Superuser',
          password: 'salainen'
        }

        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(result.body).toEqual({
          error: 'username must be atleast 3 characters'
        })

        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
      })
    })
  })
})

afterAll(() => {
  server.close()
})
