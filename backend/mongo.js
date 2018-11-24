const mongoose = require('mongoose')
const config = require('./utils/config')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose
  .connect(config.mongoUrl)
  .then(() => {
    console.log('connected to database', config.mongoUrl)
  })
  .catch(err => {
    console.log(err)
  })

const Blog = mongoose.model('Blog', {
  title: String,
  author: String,
  url: String,
  likes: Number,
  comments: [String]
})

Blog.find({}).then(result => {
  result.forEach(blog => {
    console.log(blog)
  })
  mongoose.connection.close()
})

// const blog = new Blog({
//   title: 'How To Combine a NodeJS Back End with a ReactJS Front End App.',
//   author: 'Ethan Jarrell',
//   url:
//     'https://hackernoon.com/how-to-combine-a-nodejs-back-end-with-a-reactjs-front-end-app-ea9b24715032',
//   likes: 3153
// })

// blog.save().then(response => {
//   console.log('blog saved!')
//   mongoose.connection.close()
// })
