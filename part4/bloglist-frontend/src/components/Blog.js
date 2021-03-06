import React, { useState } from 'react'
import blogServices from '../services/blogs'
const Blog = ({ blog, setBlogs, blogs, likeClicked }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showBlogDetail, setShowBlogDetail] = useState(false)
  const [curBlog, setCurBlog] = useState(blog)

  const toggleShowDetails = () => {
    setShowBlogDetail(!showBlogDetail)
  }

  const handleLikeOneBlog = async (blog) => {

    //non sence, just for exercise
    likeClicked()

    try {
      const newerBlog = await blogServices.likeOneBlog(blog)
      setCurBlog(newerBlog)
    } catch (error) {
      console.log(error.messages)
    }
  }
  const handleDeleteOneBlog = async (blog) => {
    const confirmRst = window.confirm('sure to delete?')
    if(!confirmRst) return
    try {
      await blogServices.deleteOneBlog(blog)
      setBlogs(blogs.filter(blg => blg.id !== blog.id))
    } catch (error) {
      console.log(error.messages)
    }
  }

  blog = curBlog

  if(!showBlogDetail){ return (
    <div style={blogStyle} className='blog'>

      <h2 className='blogTitleAndAuthor'>{blog.title} --- {blog.author.name} </h2>
      <button onClick={ toggleShowDetails }>View detail</button>
    </div>
  )}
  else {
    return (
      <div style={blogStyle} className='blog'>
        <h2 className='blogTitleAndAuthor'>{blog.title} </h2>
        <button onClick={ toggleShowDetails }>hide detail</button>
        <div>URL: {blog.url}</div>
        <div>Likes: {blog.likes}</div><button onClick={() => handleLikeOneBlog(blog)}>like</button>
        <div>Author: {blog.author.name}</div>
        <button onClick={() => handleDeleteOneBlog(blog)}>delete Blog</button>
      </div>
    )
  }
}

export default Blog
