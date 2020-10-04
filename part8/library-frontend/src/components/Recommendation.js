import React, { useEffect, useState } from 'react'
import {ALL_BOOKS, MY_FAVORITE_GENRE} from '../services/queris'
import { useLazyQuery, useQuery } from '@apollo/client'

const Recommendation = (props) => {
  const favoriteGenre = useQuery(MY_FAVORITE_GENRE)
  const [getFavBooks, favBooks] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if(!favoriteGenre.loading){
      getFavBooks({variables: {genre: favoriteGenre.data.queryMyFavoriteGenre}})
    }
  
  }, [favoriteGenre.data])

  if (!props.show) {
    return null
  }
  if(favoriteGenre.loading || favBooks.loading) {
    return  (
      <div>Loading...</div>
    )
  }

  const books = favBooks.data.allBooks
  const favoriteGenreStr = favoriteGenre.data.queryMyFavoriteGenre

  return (
    <div>
      <h2>Recommendated Books </h2>

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
            if(a.genres && (a.genres.includes(favoriteGenreStr) || !favoriteGenreStr)){
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

    </div>
  )
}

export default Recommendation