import { useDispatch } from "react-redux"

const initialNoti = { message: ''}

const setNotification = (msg, time) => {

  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message: msg,
        time
      }
    })
    setTimeout(() => {
      dispatch(deleteNotification())
    }, time*1000)

  }
  
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
      const msg = action.data.message
      return { ...state, message: msg}

    case 'DELETE_NOTI':
      return { ...state, message: '' }

    default:
      return state
  }
}

export default notificationReducer
export {
  setNotification,
  deleteNotification
}