

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

export const setNotification = (msg) => {
  return {
    type: 'SET_NOTIFICATION',
    data: msg
    }

  }


export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default NotificationReducer