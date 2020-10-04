import React, { useState } from 'react'
import { LOGIN } from '../services/queris'
import { useMutation } from '@apollo/client'

const LoginForm = ( {setToken, show} ) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login] = useMutation(LOGIN,
    {
      onError: e => console.log(e.graphQLErrors[0].message),
      onCompleted: (data) => {
        setToken(data.login.value)
        localStorage.setItem('library-app-token', data.login.value)
      }
    })

  if(!show)return null
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    login({
      variables: {password, username}
    })


  }


  return (
    <div>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <div>username:
          <input value={username} 
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>password:
          <input value={password} 
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm