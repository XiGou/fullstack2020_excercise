
import { useApolloClient } from '@apollo/client'
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommendation from './components/Recommendation'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('library-app-token'))
  const client = useApolloClient()
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommendate')}>recommendate</button>
        <button hidden={ token } onClick={() => setPage('loginForm')}>login</button>
        <button hidden={!token} onClick={() => setPage('add')}>add book</button>
        <button hidden={!token} onClick={ logout } >logout</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add' || (page === 'loginForm' && token)}
      />

      <Recommendation 
        show={page === 'recommendate'}
      />
      
      <LoginForm
        setToken={setToken}
        show={page === 'loginForm' && !token} 
      />

    </div>
  )
}

export default App