const mongoose = require('mongoose')
const User = require('./user')

const blogSchema = mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  url: String,
  comments:[String],
  likes: Number
})

blogSchema.post('remove', async doc => {
  const user = await User.findById(doc.author)
  user.articles = user.articles.filter(artiID => {
    // console.log(doc._id, " ", artiID, " ", String(artiID) !== String(doc._id))
    return String(artiID) !== String(doc._id)
  })
  await User.updateMany({_id: doc.author}, user)

})

blogSchema.post('save', async doc => {
  const user = await User.findById(doc.author)
  
  user.articles = user.articles.concat(doc._id)
  // console.log(user)
  await User.updateMany({_id: doc.author}, user)
})


blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})



const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog