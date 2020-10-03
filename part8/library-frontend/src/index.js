import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, gql} from '@apollo/client'
import ALL_AUTHORS from './services/queris'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://192.168.11.110:4000/',
  })
})



ReactDOM.render(<ApolloProvider client={client}>
   <App />
</ApolloProvider>, document.getElementById('root'))