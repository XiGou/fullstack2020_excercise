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
  
  const mockTestCreateBlog = jest.fn()
  const component = render(
    <CreateBlogForm  createBlog={ mockTestCreateBlog } />
  )

  const uinput = component.container.querySelector('#urlInput')
  const ainput = component.container.querySelector('#authorInput')
  const tinput = component.container.querySelector('#titleInput')
  const btn = component.container.querySelector('button')
  // component.debug()

  fireEvent.change(uinput, {target: {value: "https://url.com"}})
  fireEvent.change(ainput, {target: {value: "jiangjiang"}})
  fireEvent.change(tinput, {target: {value: "fake title!"}})

  fireEvent.click(btn)

  expect(mockTestCreateBlog.mock.calls.length).toBe(1)
  expect(mockTestCreateBlog.mock.calls[0][0]).toEqual(
    { url: 'https://url.com',
    author: 'jiangjiang',
    title: 'fake title!' })
})