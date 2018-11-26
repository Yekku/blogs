import { createStore, combineReducers, applyMiddleware } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  login: loginReducer,
  users: userReducer,
  blogs: blogReducer,
  notification: notificationReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
