
import  { composeWithDevTools } from 'redux-devtools-extension'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'


const reducer = combineReducers(
  { blogs: blogsReducer,
  // user: userReducer,
  notification: notificationReducer
 }
)

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  ) 
)

export default store