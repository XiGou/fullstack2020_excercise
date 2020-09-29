import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch, connect } from 'react-redux'
import { deleteNotification, setNotification } from '../reducers/notificationReducer'
import anecService from '../services/anecdotes'
import { createContext } from 'react'




const AnecdoteForm = (props) => {
  
  const dispatch = useDispatch()
  const handleSubmit =  (e) => {
    
    e.preventDefault()
    const anecText = e.target.anecText.value
    e.target.anecText.value = ''

    props.createAnecdote(anecText)
    props.setNotification(`You Created : ${anecText}`, 3)
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

const mapDispatchToProps = dispatch =>  {
  return {
    createAnecdote: anecText => dispatch(createAnecdote(anecText)),
    setNotification: (NotiText, time) => dispatch(setNotification(NotiText, time))
  }
}


export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)