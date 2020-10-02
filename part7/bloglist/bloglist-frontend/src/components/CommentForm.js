import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogsReducer'
import blogServices from '../services/blogs'
import { Form, Button, Row, Col } from 'react-bootstrap'

const CommentForm = ({blog}) => {
  const [commentText, setCommentText] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    console.log(commentText)
    if(commentText === '' || commentText==='comment here.'){
      alert('write a comment first!')
      return
    }
    try {
      const newerBlog = await blogServices.commentOneBlog(blog, commentText)
      console.log(newerBlog)
      dispatch(updateBlog(newerBlog))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Row>
            <Col xs={5}>
              <Form.Control onChange={(evt)=>setCommentText(evt.target.value)}></Form.Control>
            </Col>
            <Col xs={1}>
              <Button variant='primary' type='submit'>Comment</Button>
            </Col>
            
          </Form.Row>
        </Form.Group>

      </Form>
    </div>
  )
}


export default CommentForm