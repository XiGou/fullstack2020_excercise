import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { intializeUsers } from '../reducers/usersReducer'
import { Tab, Table } from 'react-bootstrap'


const Users = () => {

  
  
  let users = useSelector( state => state.users)
  console.log(users)
  return (
    <div>
      <h1>Users</h1>
        <Table striped>

          <tbody>

            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
            {
              users.map(user => {
                return (
                  <tr key={user.id}>
                    <td> <Link to={'/users/' + user.id}>{user.name}</Link></td>
                    <td>{user.articleNum}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>

    </div>
  )
}

export default Users