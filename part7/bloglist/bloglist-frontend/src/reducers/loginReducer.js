
const initialLgnInfo = {
  password: '',
  username: '',
  status: 'notlogin'
}

const setUsername = (username) => {
  return dispatch => {
    dispatch({
      type: 'SET_USERNAME',
      data: username
    })
  }
}
const setPassword = (password) => {
  return dispatch => {
    dispatch({
      type: 'SET_PASSWORD',
      data: password
    })
  }
}
const setLoggedin = () => {
  return dispatch => {
    dispatch({
      type: 'SET_LOGGEDIN'
    })
  }
}
const setNotlogin = () => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTLOGDIN'
    })
  }
}


const loginReducer = (loginInfo = initialLgnInfo, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return {...loginInfo, username : action.data}
      
    case 'SET_PASSWORD':
      return {...loginInfo,  password: action.data}
    case 'SET_LOGGEDIN':
      return {...loginInfo,  status: 'loggedin'}
    case 'SET_NOTLOGDIN':
      return {...loginInfo,  status: 'notlogin'}
    default:
      return loginInfo;
  }
}

export default loginReducer
export {
  setPassword,
  setUsername,
  setLoggedin,
  setNotlogin
}