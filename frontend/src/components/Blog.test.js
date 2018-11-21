import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
  let blogComponent
  let blog
  beforeEach(() => {
    blog = {
      title: 'Just for test',
      author: 'Yevgen Liukkonen',
      url: 'http://localhost',
      likes: 10,
      user: {
        username: 'secret'
      }
    }
    blogComponent = shallow(<Blog blog={blog} loggedUser={'secret'} />)
  })

  it('it renders title and author', () => {

    const nameDiv = blogComponent.find('.name')
    console.log(nameDiv.debug())
    expect(nameDiv.text()).toContain(blog.title)
    expect(nameDiv.text()).toContain(blog.author)
  })

  it('after clicking name the details are displayed', () => {


    const nameDiv = blogComponent.find('.name')
    console.log(nameDiv.debug())

    nameDiv.simulate('click')

    const contentDiv = blogComponent.find('.content')
    expect(contentDiv.getElement().props.style).toEqual({ display: '' })
  })

})
