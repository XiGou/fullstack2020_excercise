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
      author{
        name
      }
      published
      genres
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
      author{
        name
      }
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

export const LOGIN = gql`
mutation login(
  $username: String! , 
  $password: String!
){
  login (username: $username , password:$password){
    value
  }
}

`


export const MY_FAVORITE_GENRE = gql`
  query{
    queryMyFavoriteGenre
  }
`