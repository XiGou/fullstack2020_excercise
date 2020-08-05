import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'




const AnecdoteForm = () => {
  
  const dispatch = useDispatch()
  const createAnec = (e) => {
    
    e.preventDefault()
    const anecText = e.target.anecText.value
    e.target.anecText.value = ''
    dispatch(createAnecdote(anecText))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={(e) => createAnec(e)}>
        <div><input name='anecText'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm