import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


test('renders blog title and author.', () => {
  const blog = {
    author: { name: 'jiangzemin' },
    title: 'How to fight flood.'
  }

  const component = render(
    <Blog blog={ blog } />
  )
  

  expect(component.container).toHaveTextContent(
    'jiangzemin'
  )
  expect(component.container).toHaveTextContent(
    'How to fight flood.'
  )

  const div = component.container.querySelector('.blogTitleAndAuthor')
  expect(div).toBeDefined()

})

test('When click detail button show url and likes.', () => {
  const blog = {
    author: { name: 'jiangzemin' },
    title: 'How to fight flood.',
    likes: 11,
    url: 'www.sb.com'
  }
  

  const component = render(
    <Blog blog={ blog } />
  )
  // component.debug()
  const btn = component.getByText('View detail')
  fireEvent.click(btn)

  expect(component.container.querySelector('div')).toHaveTextContent('URL: www.sb.com')
  expect(component.container.querySelector('div:nth-child(1)')).toHaveTextContent('Likes: 11')
})

test('When click like button twice.', () => {
  const blog = {
    author: { name: 'jiangzemin' },
    title: 'How to fight flood.',
    likes: 11,
    url: 'www.sb.com'
  }
  
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={ blog } likeClicked={ mockHandler } />
  )
  // component.debug()
  const btn = component.getByText('View detail')
  fireEvent.click(btn)

  const likeBtn = component.getByText('like')
  fireEvent.click(likeBtn)
  fireEvent.click(likeBtn)

  expect(mockHandler.mock.calls).toHaveLength(2)
  
  
})