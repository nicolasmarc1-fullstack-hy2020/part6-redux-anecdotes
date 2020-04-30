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

export const notificationOn = (text) => {
 
  return {
    type: 'NOTIFICATION_ON',
    data: {
      text,
    },
  }
}

export const notificationOff = () => {
  return {
    type: 'NOTIFICATION_OFF',
  }
}

export default notificationReducer
