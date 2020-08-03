import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'


test('When click like button twice.', () => {
  const blog = {
    author: { name: 'jiangzemin' },
    title: 'How to fight flood.',
    likes: 11,
    url: 'www.sb.com'
  }
  
  const mockHandler = jest.fn()
  const component = render(
    <CreateBlogForm  mockTestCreateBlog={ mockHandler } />
  )
  // component.debug()

  
  
})