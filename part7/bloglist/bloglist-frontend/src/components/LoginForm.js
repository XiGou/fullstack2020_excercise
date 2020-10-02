import React, { useState } from 'react'
import loginService from  '../services/login'
import blogService from  '../services/blogs'
import {useSelector, useDispatch} from 'react-redux' 
import {setUsername, setPassword, setNotlogin, setLoggedin} from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()
    let user
    try {
      user = await loginService.login(username, password)
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      dispatch(setLoggedin())
    } catch (error) {
      dispatch(setNotification(`${error.message}, ${JSON.stringify(error.response.data)}`, 3))
    }
  }
  const username = useSelector( state => state.login.username)
  const password = useSelector( state => state.login.password)

  return (
    <div>
      <form>
          <div>
            username:<input id='usernameInput' value={username || ''}
              onChange={event => dispatch(setUsername(event.target.value))}/>
          </div>
          <div>
            password:<input id='passwdInput' value={password || ''}
              onChange={event => dispatch(setPassword(event.target.value))}
              type='password'/>
          </div>
          <Button id='loginBtn' type='submit' onClick={handleLogin}>login</Button>
        </form>
    </div>
  )
}

export default LoginForm