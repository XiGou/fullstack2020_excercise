const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async (req, res) => {
    const body = req.body

    const user = await User.findOne({userName: body.userName})

    const passwdCorrect = user === null ? false: await bcrypt.compare(body.passwd, user.passwdHash)

    if( !(user && passwdCorrect)){
        return res.status(401).json({
            error: 'password or user  name invalid.'
        })
    }
    const userForToken = {
        userName:user.userName,
        id: user._id
    }

    const token = jwt.sign(userForToken, config.SECRET)

    res.status(200).send({...userForToken, token})

})


module.exports = loginRouter