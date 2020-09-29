import React, {useState} from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'


const CreateBlogForm = ({CreateBlogFunc}) => {
  const [newBlog, setNewBlog] = useState({})

  const handleTitle = (event) => {
    setNewBlog( { ...newBlog, title: event.target.value } )
  }
  const handleAuthor = (event) => {
    setNewBlog( { ...newBlog, author: event.target.value } )
  }
  const handleUrl = (event) => {
    setNewBlog( { ...newBlog, url: event.target.value } )
  }
  
  const handleCreateBlog = event => {
    event.preventDefault()
    CreateBlogFunc(newBlog)
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