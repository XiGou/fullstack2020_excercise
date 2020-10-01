import React, { useState, useEffect, useRef } from 'react'
import BlogsList from './components/BlogsList'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import {useDispatch} from 'react-redux' 
import { addBlog, intializeBlogs } from './reducers/blogsReducer'
import { setNotification, deleteNoti } from './reducers/notificationReducer'

const App = () => {

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  
  const [loginNoti, setLoginNoti] = useState(null)
  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(intializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedBloglistuser = window.localStorage.getItem('loggedBloglistUser')
    if(loggedBloglistuser){
      const user = JSON.parse(loggedBloglistuser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    let user
    try {
      user = await loginService.login(username, password)
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(setNotification(`${error.message}, ${JSON.stringify(error.response.data)}`, 3))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(
      'loggedBloglistUser'
    )
    setUser(null)
  }

  const CreateBlog = async (newBlog) => {
    let resData
    try {
      // console.log(newBlog)
      resData = await blogService.createBlog(newBlog)
      dispatch(setNotification(`${newBlog.title} By ${newBlog.author} Created.`, 3))
      dispatch(addBlog(resData))
      blogFormRef.current.toggleVisible()

    } catch (error) {
      dispatch(setNotification(`error:${error.message}`, 3))
    }
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form>
          <div>
            username:<input id='usernameInput' value={username || ''}
              onChange={event => setUsername(event.target.value)}/>
          </div>
          <div>
            password:<input id='passwdInput' value={password || ''}
              onChange={event => setPassword(event.target.value)}
              type='password'/>
          </div>
          <button id='loginBtn' type='submit' onClick={handleLogin}>login</button>
        </form>
      </div>
    )
  }



  return (
    <div>
      <h2>blogs</h2>
      <div> {user.userName} has logged in. <button onClick={handleLogout}>logout</button> </div>
      <Togglable
        buttonLabelWhenshow='cancel'
        buttonLabelWhenhide='new blog'
        ref={blogFormRef} >

        <CreateBlogForm
          CreateBlogFunc={CreateBlog}
        />
      </Togglable>

      <BlogsList />
    </div>
  )
}

export default App