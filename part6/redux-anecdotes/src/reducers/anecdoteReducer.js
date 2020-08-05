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

const initialState = anecdotesAtStart.map(asObject)

const voteOneAnecdote = ( anecID ) => {
  return {
    type: 'VOTE',
    data: {
      id: anecID
    }
  }
}

const createAnecdote = ( anecText ) => {
  return {
    type: 'CREATE_ANECDOTE',
    data: {
      anecText
    }
  }
}

const reducer = (state = initialState, action) => {
  switch ( action.type ){
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find( anec => anec.id === id)
      const changedAnec = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map( anec =>
        anec.id === id ? changedAnec : anec
      )
    case 'CREATE_ANECDOTE':
      const anecText = action.data.anecText
      const anecObj = asObject(anecText)
      return state.concat(anecObj)
    default:
      return state
  } 


  // console.log('state now: ', state)
  // console.log('action', action)
}

export default reducer
export {
  voteOneAnecdote,
  createAnecdote
}