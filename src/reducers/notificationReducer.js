const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NOTIFICATION_ON':
      return {text: action.data.text}
    case 'NOTIFICATION_OFF':
      return null
    default:
      return state
  }
}

export const setNotification = (text, time) => {
  

  return async (dispatch) => {
    dispatch({
      type: 'NOTIFICATION_ON',
      data: {
        text,
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION_OFF'
      })
    }, time * 1000)
  }
}

export default notificationReducer
