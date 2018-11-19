const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.content
    case 'HIDE_NOTIFICATION':
      return null
    default:
      return state

  }
}

export const notify = (content, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      content
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION',
      })
    }, time * 1000)
  }
}

export default notificationReducer