import React, { useState, useEffect, useRef } from 'react'
import BlogsList from './components/BlogsList'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import UserInfo from './views/UserInfo'
import Blog from './views/Blog'
import {useDispatch, useSelector} from 'react-redux' 
import { addBlog, intializeBlogs } from './reducers/blogsReducer'
import { setNotification, deleteNoti } from './reducers/notificationReducer'
import { setLoggedin, setNotlogin } from './reducers/loginReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect,
  useRouteMatch
} from 'react-router-dom'
import Users from './views/Users'
import { intializeUsers } from './reducers/usersReducer'
import { Button, Nav } from 'react-bootstrap'


const App = () => {

  const loginInfo = useSelector( state => state.login)
  const users = useSelector(state => state.users)
  const allBlogs = useSelector(state => state.blogs)

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(intializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedBloglistuser = window.localStorage.getItem('loggedBloglistUser')
    if(loggedBloglistuser){
      const user = JSON.parse(loggedBloglistuser)
      blogService.setToken(user.token)
      dispatch(setLoggedin())
    }
  }, [])

  useEffect(() => {
    dispatch(intializeUsers())
  }, [dispatch])

  const matchUserID = useRouteMatch('/users/:id')
  const user = matchUserID
    ? users.find(u => {
      // console.log(String(u.id) === String(matchUserID.params.id), " ", u.id, " ", matchUserID.params.id)
      return String(u.id) === String(matchUserID.params.id)
    })
    : null
  const matchBlogID = useRouteMatch('/blogs/:id')
  const blog = matchBlogID
    ? allBlogs.find(b => {
      // console.log(String(u.id) === String(matchBlogID.params.id), " ", u.id, " ", matchUserID.params.id)
      return String(b.id) === String(matchBlogID.params.id)
    })
    : null



  const handleLogout = () => {
    window.localStorage.removeItem(
      'loggedBloglistUser'
    )
    dispatch(setNotlogin())
  }




  if (loginInfo.status === 'notlogin') {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }
  const Menu = () => {
    return (
      <Nav>
        <Nav.Item>
          <Nav.Link eventKey='/' href='#'>
            <Link to='/blogs'>Blogs</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='users' href='#' as='span'>
            <Link to='/users'>Users</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            <span>
              {loginInfo.username} has logged in. <Button onClick={handleLogout}>logout</Button> 
            </span>
          </Nav.Link>
        </Nav.Item>
      </Nav>

    )
  }



  
  return (
    <div className='container'>
      <Menu />
      <h2>blogs</h2>
      
      
      <Switch>
        <Route path='/users/:id'>
          <UserInfo user={user} />
        </Route>
        <Route path='/blogs/:id'>
          <Blog blog={blog} />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route>
          <Togglable
          buttonLabelWhenshow='cancel'
          buttonLabelWhenhide='new blog'
          ref={blogFormRef}
          >
            <CreateBlogForm  blogFormRef={blogFormRef}/>
          </Togglable>
          <BlogsList />
        </Route>
      </Switch>
      
      
      

      
    </div>
  )
}

export default App