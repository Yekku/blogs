import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'
import { Togglable } from './Togglable'

describe('<Togglable />', () => {
  let togglableComponent
  const mockTogglablefn = jest.fn()
  beforeEach(() => {
    togglableComponent = shallow(
      <Togglable buttonLabel="show..." onClick={mockTogglablefn}>
        <div className="testDiv" />

      </Togglable>
    )
  })

  it('renders its children', () => {
    expect(togglableComponent.contains(<div className="testDiv" />)).toEqual(true)
  })

  it('at start the children are not displayed', () => {
    const div = togglableComponent.find('.togglableContent')
    expect(div.getElement().props.style).toEqual({ display: 'none' })
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
      <Blog blog={blog1} />
      <Blog blog={blog2} />
    </Togglable>)

    console.log(togglableComponent.debug())
  })

})