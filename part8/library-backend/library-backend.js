const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const bookModel = require('./models/Book')
const authorModel = require('./models/Author')
const { resolveFieldValueOrError } = require('graphql/execution/execute')
const { argsToArgsConfig } = require('graphql/type/definition')
const { GraphQLBoolean, GraphQLError } = require('graphql')
const User = require('./models/User')
const jwt = require('jsonwebtoken')

const MONGODB_URI = 'mongodb+srv://fullstack:pYewdRVqybNJaTrf@cluster0.zd8sp.mongodb.net/bloglist?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   { 
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   { 
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },  
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]

const typeDefs = gql`
  type Book{
    title: String!
    published: Int!
    author: Author!
    id: String!
    genres: [String]
  }
  
  type Author{
    name: String!
    id: String!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author:String, genre:String): [Book]!
    allAuthors: [Author]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
    ):Book

    addAuthor(
      name: String!
      born: Int
      bookCount: Int!
    ):Author
    
    editAuthorChgBirthYear(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    
  }
`

const resolvers = {
  Query: {
    bookCount: () => bookModel.collection.countDocuments(),
    authorCount: () => authorModel.collection.countDocuments(),
    allBooks: async (root, args) => {
      let result = await bookModel.find({})
      if(typeof(args.author) !== 'undefined')  result = result.
        filter( bk => bk.author === args.author)
      if(typeof(args.genre) !== 'undefined')  result = result.
        filter( bk => bk.genres.includes(args.genre))

      return result
    },
    allAuthors: async () => {
      rst = await  authorModel.find({})
      return rst
    },
  },
  Mutation: {
    addBook: async (parent, args, context) => {
      const currentUser = context.currentUser
      
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const book = new bookModel({...args})
      const existAuthor = await authorModel.findOne( {name: args.author, } )
      if(!existAuthor){
        const author = new authorModel({name: args.author})
        await author.save()
        // console.log(author,"+")
      }
      const author =await authorModel.findOne({name: args.author})
      // console.log(author)
      book.author = author._id
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    addAuthor: async (parent, args) => {
      const author = new authorModel({...args})
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    editAuthorChgBirthYear: async (parent, args, context) => {
      const currentUser = context.currentUser
      
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const result = await authorModel.findOne( {name: args.name})
      if(!result) return null
      result.born = args.setBornTo
      return result.save()
    },
    createUser: (parent, args) => {
      const user = new User({...args})
      return user.save().catch(
        error => {
          throw new UserInputError(error.message, { 
          invalidArgs: args,})
        }
      )
    },
    login: async (parent, args) => {
      const user = await User.findOne({username: args.username})
      if(!user || args.password !== 'fakepass'){
        throw new UserInputError("wrong passwd.")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return {value: jwt.sign(userForToken, 'FAKE_SECRET')}

    }
  },

  Author: {
    bookCount: async (parent) => {
        const result = await bookModel.count({author: parent._id})
      return result
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), 'FAKE_SECRET'
      )

      const currentUser = await User.findById(decodedToken.id)
      

      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
