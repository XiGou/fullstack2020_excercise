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
  const [newBlog, setNewBlog] = useState({}) 
  const [notification, setNotification] = useState(null)
  const [loginNoti, setLoginNoti] = useState(null)
  const blogFormRef = useRef()


  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=>{
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
      }, 3000);
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem(
      'loggedBloglistUser'
    ) 
    setUser(null)
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={loginNoti}/>
        <form>
          <div>
            username:<input value={username || ''} 
                      onChange={event=>setUsername(event.target.value)}/>
          </div>
          <div>
            password:<input value={password || ''}
                     onChange={event=>setPassword(event.target.value)}
                     type='password'/>
          </div>
          <button type='submit' onClick={handleLogin}>login</button>
        </form>
      </div>
    )
  }

  blogs.sort((a, b)=>-(a.likes-b.likes))

  return (
    <div>
      <h2>blogs</h2>
      <div> {user.userName} has logged in. <button onClick={handleLogout}>logout</button> </div> 
      <Togglable 
      buttonLabelWhenshow='cancel'
      buttonLabelWhenhide='new blog'
      ref={blogFormRef} >

        <CreateBlogForm 
        setNewBlog={setNewBlog}
        newBlog={newBlog}
        blogs={blogs}
        setBlogs={setBlogs}
        notification={notification}
        setNotification={setNotification}
        blogFormRef={blogFormRef}
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