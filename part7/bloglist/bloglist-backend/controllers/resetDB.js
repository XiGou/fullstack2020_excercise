const resetRouter = require('express').Router()
const blogs = require('../models/blogs')
const user = require('../models/user')

resetRouter.post('/', async (request, response) => {
  await blogs.deleteMany({})
  await user.deleteMany({})

  response.status(204).end()
})

module.exports = resetRouter