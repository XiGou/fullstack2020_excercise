import {gql} from '@apollo/client'

export const BOOK_ADD = gql`
  subscription{
    bookAdded {
      title
      author{
        name
      }
      genres
      published
      id
    }
  }
` 