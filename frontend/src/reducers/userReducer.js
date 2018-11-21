import usersService from '../services/users'

const reducer = (state = [], action) => {
  if (action.type === 'INIT_USERS') {
    return (state = action.data)
  }

  if (action.type === 'CREATE_USER') {
    console.log(action.content)
    return state.concat(action.data)
  }

  if (action.type === 'REFRESH_USER') {
    const filteredState = state.filter((u) => u._id !== action.data._id)
    return [...filteredState, action.data]
  }

  return state
}

export const initUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const create = (user) => async (dispatch) => {
  const newUser = await usersService.create(user)
  dispatch({
    type: 'CREATE_USER',
    data: newUser
  })
}

export const refreshUser = (id) => async (dispatch) => {
  const user = await usersService.getById(id)
  dispatch({
    type: 'REFRESH_USER',
    data: user
  })
}

export default reducer
