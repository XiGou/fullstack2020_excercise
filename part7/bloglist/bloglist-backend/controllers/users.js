const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

usersRouter.post('/', async (req, res, next) => {
    const body = req.body

    if(body.passwd.length <= 10){
        return res.status(400).json({error: 'password too short.'})
    }

    const saltRound = 10
    const passwdHash = await bcrypt.hash(body.passwd, saltRound)
    
    const user = new User({
        name: body.name,
        userName: body.userName,
        passwdHash: passwdHash,
        articles: []
    })
    let savedUser
    try {
        savedUser = await user.save()
        
    } catch (error) {
        next(error)
        return
    }

    res.json(savedUser)

})

usersRouter.get('/', async (req, res, next) => {

    // const token = req.token
    // const decodedToken = jwt.verify(token, config.SECRET)

    // if(!token || !decodedToken.id){
    //     // not right
    //     return response.status(404).json({error: 'token missing or invalid.'})
    // }

    const users = await User.find({}).populate('articles')
    usersWithArtiNum = users.map(u => {

        return {
            name: u.name,
            userName: u.userName,
            id: u.id,
            articles: u.articles,
            articleNum: u.articles.length
        }
    })


    res.status(200).json(usersWithArtiNum)
})
usersRouter.get('/:id', async (req, res, next) => {

    // const token = req.token
    // const decodedToken = jwt.verify(token, config.SECRET)

    // if(!token || !decodedToken.id){
    //     // not right
    //     return response.status(404).json({error: 'token missing or invalid.'})
    // }

    const user = await User.find({_id: req.params.id}).populate('articles')
    res.status(200).json(user)
})

module.exports = usersRouter