import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { intializeUsers } from '../reducers/usersReducer'

const UserInfo = ({user}) => {
  console.log(user)
  if(null === user || typeof(user) === "undefined" ) return null

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.articles.map(a => <li key={a.id}>{a.title}</li> )}
      </ul>  
    </div>
  )
}

export default UserInfo