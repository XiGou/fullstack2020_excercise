import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [notification, setNotification] = useState(null)
  const [loginNoti, setLoginNoti] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

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
      setLoginNoti(`${error.message}, ${JSON.stringify(error.response.data)}`)
      setTimeout(() => {
        setLoginNoti(null)
      }, 3000)
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
      setNotification(`${resData.title} By ${newBlog.author} Created.`)
      setBlogs(blogs.concat(resData))
      blogFormRef.current.toggleVisible()

    } catch (error) {
      setNotification(`error:${error.message}`)
    }
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={loginNoti}/>
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

  blogs.sort((a, b) => -(a.likes-b.likes))

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

      {
        blogs.map(blog =>
          <Blog key={blog.id}
            blog={blog}
            setBlogs={setBlogs}
            blogs={blogs} />
        )}
    </div>
  )
}

export default App