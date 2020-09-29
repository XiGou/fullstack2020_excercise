import { useDispatch } from "react-redux"

const initialNoti = { 
  message: '',
  timeoutIDs: []
}

const setNotification = (msg, time) => {

  return async dispatch => {
    
    const tmoID = setTimeout(() => {
      dispatch(deleteNotification())
    }, time*1000)

    console.log("  ", tmoID)
    
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message: msg,
        tmoutID: tmoID
      }
    })

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
      const tmoutID = action.data.tmoutID
      // console.log("tmoutID:", state.timeoutIDs)
      
      for (const ID of state.timeoutIDs) {
        // console.log("DEL tmoutID:", ID)
        clearTimeout(ID)
      }
      return { ...state, message: msg, timeoutIDs: [tmoutID] }

    case 'DELETE_NOTI':

      return { ...state, message: '', timeoutIDs:[] }

    default:
      return state
  }
}

export default notificationReducer
export {
  setNotification,
  deleteNotification
}