import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { deleteNotification } from '../reducers/notificationReducer'
import anecService from '../services/anecdotes'




const AnecdoteForm = () => {
  
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    
    e.preventDefault()
    const anecText = e.target.anecText.value
    e.target.anecText.value = ''

    const newAnec = await anecService.createAnec({
      vote:0,
      content: anecText
    })
    dispatch(createAnecdote(newAnec))
    setTimeout(() => dispatch(deleteNotification()), 5000)
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