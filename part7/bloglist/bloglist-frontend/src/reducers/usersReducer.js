import usersService from '../services/users'

const initialUsers = []

const intializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAllUsers() 
    dispatch({
      type:  'INIT_USERS',
      data: users
    })
  }
}




const usersReducer = (users = initialUsers, action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    default:
      return users;
  }
}

export default usersReducer
export {
  intializeUsers,
}