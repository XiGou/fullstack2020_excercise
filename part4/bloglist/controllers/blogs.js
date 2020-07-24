const express = require('express')
const blogsRouter = express.Router()

const Blog = require('../models/blogs')


blogsRouter.get('/', async (request, response) => {
    let allblogs = await Blog.find({})
    
    response.json(allblogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    if(blog.likes === undefined){
        blog.likes = 0
    }

    if(blog.url === undefined || blog.title === undefined){
        return response.status(400).end()
    }

    let savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    
    let deleteRes = await Blog.deleteOne({_id: id})
    
    response.status(204).json(deleteRes)
})
blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    
    let updatedres = await Blog.updateOne({_id: id}, {likes: request.body.likes})
    let updatedNote = await Blog.findById(id)
    response.json(updatedNote)
})

module.exports = blogsRouter