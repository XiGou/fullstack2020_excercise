import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { delBlog, updateBlog } from '../reducers/blogsReducer'
import blogServices from '../services/blogs'
const BlogListItem = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const dispatch = useDispatch()

  const [showBlogDetail, setShowBlogDetail] = useState(false)

  const toggleShowDetails = () => {
    setShowBlogDetail(!showBlogDetail)
  }

  

  // if(!showBlogDetail){}
  // else {
   return (
    <div style={blogStyle} className='blog'>
      <Link to={'/blogs/' + blog.id}>
        <h2 className='blogTitleAndAuthor'>{blog.title} --- {blog.author.name} </h2>
      </Link>
      {/* <button onClick={ toggleShowDetails }>View detail</button> */}
    </div>)
  //   return (
  //     <div style={blogStyle} className='blog'>
  //       <Link to={'/blogs/' + blog.id}>
  //         <h2 className='blogTitleAndAuthor'>{blog.title} </h2>
  //       </Link>
  //       {/* <button onClick={ toggleShowDetails }>hide detail</button> */}
  //       <div>URL: {blog.url}</div>
  //       <div>Likes: {blog.likes}</div><button onClick={() => handleLikeOneBlog(blog)}>like</button>
  //       <div>Author: {blog.author.name}</div>
  //       <button onClick={() => handleDeleteOneBlog(blog)}>delete Blog</button>
  //     </div>
  //   )
  // }
}

export default BlogListItem
