
const initialNoti = {
  text: '',
  timeoutID: null
}

const setNotification = (text, timeSec) => {
  return dispatch => {
    const tmoutID = setTimeout(()=>{
      dispatch({
        type: 'DEL_NOTI'
      })
    }, timeSec*1000)
    dispatch({
      type:  'SET_NOTI_SEC',
      data: {
        timeoutID: tmoutID,
        text: text
      }
    })
  }
}

const deleteNoti = () => {
  return dispatch => {
    dispatch({
      type: 'DEL_NOTI'
    })
  }
}


const notificationReducer = (notification = initialNoti, action) => {
  switch (action.type) {
    case 'SET_NOTI_SEC':
      if(notification.timeoutID !== null){
        clearTimeout(notification.timeoutID)
      }
      return action.data
      
    case 'DEL_NOTI':
      return initialNoti
      
    default:
      return initialNoti;
  }
}

export default notificationReducer
export {
  setNotification,
  deleteNoti
}