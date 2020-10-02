import React from 'react'
import BlogListItem from './BlogListItem'
import { useSelector, useDispatch } from 'react-redux'

const BlogsList = () => {
  
  const blogs = useSelector(state => state.blogs)
  return (
    <div>
      {
        blogs.map(blog =>
          <BlogListItem key={blog.id} blog={blog}/>
        )}
    </div>
  )
}

export default BlogsList