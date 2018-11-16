import React from 'react'
import { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Blog from './Blog'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  let togglableComponent

  beforeEach(() => {
    togglableComponent = shallow(
      <Togglable buttonLabel="show...">
        <div class="testDiv" />
      </Togglable>
    )
  })

  it('renders its children', () => {
    expect(togglableComponent.contains(<div class="testDiv" />)).toEqual(true)
  })

  it('at start the children are not displayed', () => {
    const div = togglableComponent.find('.togglableContent')
    expect(div.getElement().props.style).toEqual({ display: 'none' })
  })

  it('after clicking the button, children are displayed', () => {
    const button = togglableComponent.find('button')

    button.at(0).simulate('click')
    const div = togglableComponent.find('.togglableContent')
    expect(div.getElement().props.style).toEqual({ display: '' })
  })

  it('shallow renders only one level', () => {
    const blog1 = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      like: 4
    }
    const blog2 = {
      title: 'shallow ei renderöi alikomponentteja',
      likes: 7
    }

    const togglableComponent = shallow(<Togglable buttonLabel="show...">
        <Blog blog={blog1} loggedUser={"secret"} />
      <Blog blog={blog2} loggedUser={'secret'}/>
      </Togglable>);

    console.log(togglableComponent.debug())
  })

  it('mount renders all components', () => {
    const blog1 = {
      title: 'Just for test',
      author: 'Yevgen Liukkonen',
      url: 'http://localhost',
      likes: 10,
      user: {
        username: 'secret'
      }
    }
    const blog2 = {
      title: 'Just for test',
      author: 'Yevgen Liukkonen',
      url: 'http://localhost',
      likes: 10,
      user: {
        username: 'secret'
      }
    }

    const blogComponent = mount(<Togglable buttonLabel="show...">
        <Blog blog={blog1} loggedUser={"secret"} />
      <Blog blog={blog2} loggedUser={'secret'}/>
      </Togglable>);

    console.log(blogComponent.debug())
  })
})