const initialNoti = { message: ''}

const setNotification = (msg) => {
  return (
    {
      type: 'SET_NOTIFICATION',
      data: {
        message: msg
      }
    }
  )
}
const deleteNotification = () => {
  return (
    {
      type: 'DELETE_NOTI'
    }
  )
}

const notificationReducer = (state = initialNoti, action) => {
  switch ( action.type ) {
    case 'SET_NOTIFICATION':
      const noti = action.data.message
      return { ...state, message: noti}

    case 'DELETE_NOTI':
      return { ...state, message: '' }

    case 'CREATE_ANECDOTE':
      const anecText = action.data.anecText
      return { ...state, message: `you create '${anecText}' `}

    default:
      return state
  }
}

export default notificationReducer
export {
  setNotification,
  deleteNotification
}