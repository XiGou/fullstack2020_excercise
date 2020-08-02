import React from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'


const CreateBlogForm = ({
  setNewBlog,
  setBlogs,
  setNotification,
  notification,
  blogs,
  newBlog,
  blogFormRef
}) => {
  const handleTitle = (event) => {
    setNewBlog( { ...newBlog, title: event.target.value } )
  }
  const handleAuthor = (event) => {
    setNewBlog( { ...newBlog, author: event.target.value } )
  }
  const handleUrl = (event) => {
    setNewBlog( { ...newBlog, url: event.target.value } )
  }
  const handleCreateBlog = async () => {
    let resData
    try {
      console.log(newBlog)
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

  return (
    <div>
      <h2>Create</h2>
      <Notification message={notification}/>
      <div>title: <input onChange={handleTitle}/> </div>
      <div>author: <input onChange={handleAuthor}/> </div>
      <div>url: <input onChange={handleUrl}/> </div>
      <button onClick={handleCreateBlog}>create</button>
    </div>
  )
}

export default CreateBlogForm