const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blogs')
const blogsRouter = require('./controllers/blogs')


const mongoUrl = 'mongodb+srv://fullstack:sLsCL1HZMKeZwDE1@cluster0.zd8sp.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app 