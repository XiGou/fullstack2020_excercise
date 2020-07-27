const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const usersSchema = mongoose.Schema({
    name: {
        type:String,
        minlength: 3,
        required: true
    },
    passwdHash:String,
    userName: {
        type:String,
        minlength: 3,
        required: true,
        unique:true
    }
})
usersSchema.plugin(uniqueValidator)

usersSchema.set('toJSON', {
    transform: (doc, returnedObj)=>{
        returnedObj.id = returnedObj._id
        delete returnedObj._id
        delete returnedObj.__v
        //not to reveal passwd
        delete returnedObj.passwdHash
    }
})

const User = mongoose.model('User', usersSchema)

module.exports = User