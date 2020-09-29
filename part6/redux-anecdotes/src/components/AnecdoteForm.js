import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { deleteNotification, setNotification } from '../reducers/notificationReducer'
import anecService from '../services/anecdotes'




const AnecdoteForm = () => {
  
  const dispatch = useDispatch()
  const handleSubmit =  (e) => {
    
    e.preventDefault()
    const anecText = e.target.anecText.value
    e.target.anecText.value = ''

    dispatch(createAnecdote(anecText))
    dispatch(setNotification(`You Created : ${anecText}`, 3))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name='anecText'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm