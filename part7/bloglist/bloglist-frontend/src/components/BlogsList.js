import React from 'react'
import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'

const BlogsList = () => {
  
  const blogs = useSelector(state => state.blogs)
  return (
    <div>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog}/>
        )}
    </div>
  )
}

export default BlogsList