const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NOTIFICATION_ON':
      return action.data
    case 'NOTIFICATION_OFF':
      return null
    default:
      return state
  }
}


export const setNotification = (text, time) => {

  return async (dispatch, getState) => {

    if (getState().notification && getState().notification.timeoutId) {
      const timeoutId = getState().notification.timeoutId
      clearTimeout(timeoutId)
    }

    const timeout = setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION_OFF',
        // could make an array, and null a specific notification id 
        // timeoutId: timeout
      })
    }, time * 1000)
    dispatch({
      type: 'NOTIFICATION_ON',
      data: {
        text,
        timeoutId: timeout
      }
    })
  }
}

export default notificationReducer
