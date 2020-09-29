import anecService from '../services/anecdotes'
import { useSelector } from 'react-redux'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(a => asObject(a))

const voteOneAnecdote = ( anec ) => {

  return async dispatch => {

    const newAnec = await anecService.voteOneAnec(anec)
    dispatch({
      type: 'VOTE',
      data: newAnec
    })

  }
}

const createAnecdote = ( anecText ) => {
  return async dispatch => {
    const createdAnec = await anecService.createAnec({
      content:anecText,
      votes: 0})
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: createdAnec
    })
  }
}

const initializeAnecdote = ( data ) => {
  return async dispatch => {
    const anecdotes = await anecService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data:anecdotes
    })
  }
}



const anecdoteReducer = (state = initialState, action) => {
  switch ( action.type ){
    case 'VOTE':
      const newAnec = action.data
      
      return state.map( anec =>
        anec.id === newAnec.id ? newAnec : anec
      )
    case 'CREATE_ANECDOTE':
      const anec = action.data
      return state.concat(anec)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  } 


  // console.log('state now: ', state)
  // console.log('action', action)
}

export default anecdoteReducer
export {
  voteOneAnecdote,
  createAnecdote,
  initializeAnecdote
}