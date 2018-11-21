import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
// jest.mock("./services/blogs");
// import blogService from "./services/blogs";

describe('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })


  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<App />)

    })

    it('only login form is rendered', () => {

      app.update()

      const loginComponent = app.find(LoginForm)
      expect(loginComponent.contains(<h2>Login to application</h2>)).toEqual(true)
      expect(loginComponent.text()).toContain('Username:')
      expect(loginComponent.text()).toContain('Password:')

      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(0)
      console.log(loginComponent.debug())
    })
  })

})
