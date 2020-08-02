import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response =await axios.get(baseUrl)
  return response.data
}

const createBlog = async (newBlog) => {
  const config = {
    headers:{Authorization: token}
  }

  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

const likeOneBlog = async (blog) => {
  const config = {
    headers:{Authorization: token}
  }
  const res = await axios.put(`${baseUrl}/${blog.id}`, {...blog, likes:blog.likes+1}, config)
  return res.data
}

const deleteOneBlog = async (blog) => {
  const config = {
    headers:{Authorization: token}
  }
  const res = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return res
}



export default { getAll, setToken, createBlog, likeOneBlog, deleteOneBlog }