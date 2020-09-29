import axios from 'axios'

const baseUrl = 'http://39.108.72.121:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnec = async (anec) => {
  const response = await axios.post(baseUrl, anec)
  return response.data
}

const voteOneAnec = async ( anec ) => {
  const response = await axios.put(`${ baseUrl }/${ anec.id }`, { ...anec, votes: anec.votes+1})
  return response.data
}

export default {
  getAll,
  createAnec,
  voteOneAnec
}