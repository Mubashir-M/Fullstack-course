

const NotificationReducer = (state = null , action) => {
  console.log('here is action: ',action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (msg, timer) => {
  return async dispatch => {
    dispatch({
        type: 'SET_NOTIFICATION',
        data: msg
    })
    setTimeout(() => {
        dispatch({
            type: 'REMOVE_NOTIFICATION',
        })
    }, timer * 1000)
}

  }



export default NotificationReducer