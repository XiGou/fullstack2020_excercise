  
import React, {useState} from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import {ALL_AUTHORS, EDIT_AUTHOR_CHG_BIRTTHYEAR} from '../services/queris'
import Select from 'react-select'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }
  

  if(result.loading) {
    return <div>Loading...</div>
  }
  const authors = result.data.allAuthors
  
  
  const SetBirthYear = () => {
    const [birthYear, setBirthYear] = useState('')
    const [selectedName, setSelectedName] = useState('')
    const [chgBirthYear] = useMutation(EDIT_AUTHOR_CHG_BIRTTHYEAR, {
      onError: error => console.log(error),
      refetchQueries: [
        {query: ALL_AUTHORS}
      ]
    })


    const handleChgBirthYear = (event) => {
      event.preventDefault()
      if(selectedName === '' || birthYear === ''){
        alert('invalid input')
        return
      }
      chgBirthYear({variables: {name: selectedName.value, setBornTo:birthYear}})
    }
    
    return (
      <div>
        <h2>Set BirthYear</h2>
        <form onSubmit={handleChgBirthYear}>
          <div>
            Name:
            <Select 
              value = {selectedName}
              onChange = {setSelectedName}
              options = { authors.map( (au) => {
                return {label: au.name, value: au.name}
              } ) }
            />
          </div>
          <div>
            birthYear:
            <input value={birthYear} type='number' onChange={({target}) => setBirthYear(Number(target.value))}/>
          </div>
          <button type='submit'>update author</button>

        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <SetBirthYear />

    </div>
  )
}

export default Authors
