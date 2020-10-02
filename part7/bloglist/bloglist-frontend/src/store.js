
import  { composeWithDevTools } from 'redux-devtools-extension'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import usersReducer from './reducers/usersReducer'


const reducer = combineReducers(
  { blogs: blogsReducer,
  login: loginReducer,
  notification: notificationReducer,
  users: usersReducer
 }
)

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  ) 
)

export default store