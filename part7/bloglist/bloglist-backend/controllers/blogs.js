const express = require('express')
const blogsRouter = express.Router()

const Blog = require('../models/blogs')
const User = require('../models/user')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (request, response) => {
    let allblogs = await Blog.find({})
                    .populate('author', {userName:1, name:1})
    
    response.json(allblogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const token = request.token
    const decodedToken = jwt.verify(token, config.SECRET)

    if(!token || !decodedToken.id){
        return response.status(404).json({error: 'token missing or invalid.'})
    }

    
    if(body.likes === undefined){
        body.likes = 0
    }

    if(body.url === undefined || body.title === undefined){
        return response.status(400).end()
    }

    const user = await User.findById(decodedToken.id)

    body.author = user.id

    const blog = new Blog(body)
    let savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})


blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id

    const token = request.token
    console.log(token)
    const decodedToken = jwt.verify(token, config.SECRET)

    if(!token || !decodedToken.id){
        return response.status(403).json({error: 'no permition to access.'})
    }

    let blogToDel = await Blog.findById(id)
    if(decodedToken.id.toString() !== blogToDel.author.toString()){
        return response.status(403).json({error: 'no Permition to delete.'})
    }
    
    let toDel = await Blog.findOne({_id: id})
    let deleteRes = toDel.remove()
    
    response.status(204).json(deleteRes)
})


blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    
    let updatedres = await Blog.updateOne({_id: id}, 
        {likes: request.body.likes, comments: request.body.comments})
    let updatedNote = await Blog.findById(id).populate('author')
    response.json(updatedNote)
})
blogsRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    let blog = await Blog.findById(id).populate('author')
    response.json(blog)
})




module.exports = blogsRouter