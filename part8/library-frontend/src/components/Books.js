import React, { useState } from 'react'
import {ALL_BOOKS} from '../services/queris'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genreFilter, setGenreFilter] = useState('')

  if (!props.show) {
    return null
  }
  if(result.loading) {
    return  (
      <div>Loading...</div>
    )
  }
  const books = result.data.allBooks
  let allGenres = books.reduce((prev, cur) =>{
    cur.genres.forEach(element => {
      prev.add(element)
    })
    return prev
  } 
  , new Set())
  
  allGenres = Array.from(allGenres)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a => {
            if(a.genres && (a.genres.includes(genreFilter) || !genreFilter)){
              return (
                <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
                </tr>
              )
            }
            else{
              return null
            }
          }
          )}
        </tbody>
      </table>
      <div>
        {allGenres.map( g => 
          (
            <button onClick={() =>{
                setGenreFilter(g)
                result.refetch()
                }
              }>{g}</button>
          ))}
      </div>
    </div>
  )
}

export default Books