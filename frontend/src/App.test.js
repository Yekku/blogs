import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import  App  from './App'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import puppeteer from 'puppeteer'
import faker from 'faker'

const person = {
  username: faker.internet.userName(),
  name: faker.name.firstName() + ' ' + faker.name.lastName(),
  password: faker.internet.password()
}
const appUrlBase = 'http://localhost:3000'
const routes = {
  public: {
    register: `${appUrlBase}/create-new-user`,
    login: `${appUrlBase}/login`
  },
  private: {
    home: `${appUrlBase}`
  },
}

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

it('renders without crashing', () => {
  const initialState = {}
  const store = mockStore(initialState)
  // eslint-disable-next-line no-unused-vars
  let app
  beforeAll(() => {
    app = shallow(<Provider store={store}><App /></Provider>).dive({ context: { store } }).dive()
  })

})

//create global variables to be used in the beforeAll function
let browser
let page

beforeAll(async () => {
  // launch browser
  browser = await puppeteer.launch({
    headless: true, // headless mode set to false so browser opens up with visual feedback
    slowMo: 250, // how slow actions should be
    devtools: true
  })
  // creates a new page in the opened browser
  page = await browser.newPage()
})

describe('when user is not logged', () => {
  it('only login form is rendered', async () => {

    page.emulate({ viewport: { width: 500, height: 2400 }, userAgent: '' })

    await page.goto(routes.public.login)
    await page.waitForSelector('h2')

    const html = await page.$eval('h2', e => e.innerHTML)
    expect(html).toBe('Login to application')


  }, 16000)
})

describe('LoginForm', () => {
  test('Can submit login form', async () => {

    page.emulate({
      viewport: {
        width: 500,
        height: 900
      },
      userAgent: ''
    })

    await page.goto(routes.public.login)
    await page.waitForSelector('form')
    await page.click('input[name=username]')
    await page.type('input[name=username]', person.username)
    await page.click('input[name=password]')
    await page.type('input[name=password]', person.password)

    await page.click('button[type=submit]')

  }, 9000000)
})

// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
  browser.close()
})
