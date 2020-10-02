import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import Notification from './Notification'


const CreateBlogForm = ({blogFormRef}) => {
  const [newBlog, setNewBlog] = useState({comments:[]})
  const dispatch = useDispatch()

  const handleTitle = (event) => {
    setNewBlog( { ...newBlog, title: event.target.value } )
  }
  const handleAuthor = (event) => {
    setNewBlog( { ...newBlog, author: event.target.value } )
  }
  const handleUrl = (event) => {
    setNewBlog( { ...newBlog, url: event.target.value } )
  }
  
  const handleCreateBlog = async event => {
    event.preventDefault()
    let resData
    try {
      // console.log(newBlog)
      resData = await blogService.createBlog({...newBlog, comments:[]})
      
      dispatch(setNotification(`${newBlog.title} By ${newBlog.author} Created.`, 3))
      dispatch(addBlog(resData))
      blogFormRef.current.toggleVisible()

    } catch (error) {
      dispatch(setNotification(`error:${error.message}`, 3))
    }
  }


  return (
    <div>
      <h2>Create</h2>
      {/* <Notification message={notification}/> */}
      <div>title: <input id="titleInput" onChange={handleTitle}/> </div>
      <div>author: <input id="authorInput" onChange={handleAuthor}/> </div>
      <div>url: <input id="urlInput" onChange={handleUrl}/> </div>
      <button id='createBlogBtn' onClick={handleCreateBlog}>create</button>
    </div>
  )
}

export default CreateBlogForm