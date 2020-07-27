const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

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
        passwdHash
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

module.exports = usersRouter