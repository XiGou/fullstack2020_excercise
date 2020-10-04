import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, gql} from '@apollo/client'
import ALL_AUTHORS from './services/queris'
import {setContext} from 'apollo-link-context'

const authLink = setContext( (_, {headers}) => {
  const token = localStorage.getItem('library-app-token')
  console.log(token?`bearer ${token}`:null)
  return {
    headers:{
      ...headers, 
      authorization: token?`bearer ${token}`:null
    }
  }
})
const httpLink = new HttpLink({uri: 'http://192.168.11.110:4000'})


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})



ReactDOM.render(<ApolloProvider client={client}>
   <App />
</ApolloProvider>, document.getElementById('root'))