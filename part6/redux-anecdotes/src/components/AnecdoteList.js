import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { voteOneAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, deleteNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes
  anecdotes.sort((a, b) => -(a.votes-b.votes))
  const dispatch = useDispatch()
  
  const vote = (id) => {
    const anec = anecdotes.find(a => a.id === id)
    dispatch(voteOneAnecdote(anec))
    dispatch(setNotification(`you vote '${anec.content}'`, 5))

    // console.log('vote', id)
  }
  
  const filterText = props.filter.text
  // console.log(filterText)

  let anecdotesToShow = anecdotes

  if(filterText !== '') {
    // need to filtering
    anecdotesToShow = anecdotes.filter( anec => anec.content.indexOf(filterText) !== -1 )
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  // console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

export default connect(
  mapStateToProps,
  )(AnecdoteList)