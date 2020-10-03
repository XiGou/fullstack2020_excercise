import {gql} from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`
export const ADD_A_BOOK = gql`
  mutation add_a_book(
    $title:String!,
    $author:String!,
    $published:Int!,
    $genres: [String]){
    addBook (
      title: $title,
      author: $author,
      published: $published,
      genres: $genres){
      title
      author
      published
      genres
    }
  }
`

export const EDIT_AUTHOR_CHG_BIRTTHYEAR = gql`
mutation editAuthorChgBirthYear(
  $name: String!,
  $setBornTo: Int!
) {
  editAuthorChgBirthYear(
    name: $name,
    setBornTo: $setBornTo) {
    name
    born
    bookCount
  }
}
`