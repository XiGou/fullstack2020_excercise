import React from 'react'
import {useDispatch} from 'react-redux'
import { delBlog, updateBlog } from '../reducers/blogsReducer'
import blogServices from '../services/blogs'
import CommentForm from '../components/CommentForm'
import { Button, Col, Row } from 'react-bootstrap'

const Blog = ( { blog } ) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const dispatch = useDispatch()
  if(blog === null || typeof(blog) === 'undefined')return null

 

  const handleLikeOneBlog = async (blog) => {

    try {
      const newerBlog = await blogServices.likeOneBlog(blog)
      // console.log(newerBlog)
      dispatch(updateBlog(newerBlog))
    } catch (error) {
      console.log(error.messages)
    }
  }
  const handleDeleteOneBlog = async (blog) => {
    const confirmRst = window.confirm('sure to delete?')
    if(!confirmRst) return
    try {
      await blogServices.deleteOneBlog(blog)
      dispatch(delBlog(blog.id))
      //setBlogs(blogs.filter(blg => blg.id !== blog.id))
    } catch (error) {
      console.log(error.messages)
    }
  }

  return (

      <div style={blogStyle} className='blog container'>
             
            <h2 className='blogTitleAndAuthor'>{blog.title} </h2>
             
             {/* <button onClick={ toggleShowDetails }>hide detail</button> */}
            <div>Author: {blog.author.name}</div>
            <Row>
              <Col xs={1}>
                <div>Likes: {blog.likes}</div>
              </Col>
              <Col xs={1}>
                <Button onClick={() => handleLikeOneBlog(blog)}>like</Button>
              </Col>
            </Row>
             <div>URL:<a href={blog.url}> {blog.url}</a></div>
             <CommentForm className='container' blog={blog}/>
             <ul>
                {blog.comments.map( (c, idx) => <li key={idx}>{c}</li>)}
             </ul>
             <Button onClick={() => handleDeleteOneBlog(blog)}>delete Blog</Button>
      </div>
  )
}

export default Blog