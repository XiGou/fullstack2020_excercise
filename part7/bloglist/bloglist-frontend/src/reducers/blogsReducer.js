import blogsService from '../services/blogs'

const initialBlogs = []

const intializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll() 
    // console.log(blogs)
    dispatch({
      type:  'INIT_BLOGS',
      data: blogs
    })
  }
}

const addBlog = (blog) => {
  return dispatch => {
    dispatch({
      type: 'ADD_BLOG',
      data: blog
    })
  }
}
const delBlog = (id) => {
  return dispatch => {
    dispatch({
      type: 'DEL_BLOG',
      data: id
    })
  }
}
const updateBlog = (blog) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_BLOG',
      data: blog
    })
  }
}

const blogsReducer = (blogs = initialBlogs, action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'ADD_BLOG':
      return [...blogs, action.data]
    case 'DEL_BLOG':
      return blogs.filter(blog => action.data == blog.id)
    case 'UPDATE_BLOG':
      return blogs.map(blog => blog.id === action.data.id? action.data:blog)
    default:
      return blogs;
  }
}

export default blogsReducer
export {
  intializeBlogs,
  addBlog,
  delBlog,
  updateBlog,
}