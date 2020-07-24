const mongoose = require('mongoose')



// if(process.argv.length !== 3 && process.argv.length !== 5){
//     console.log(process.argv.length)
//     console.log('Please provide the password as an argument: node mongo.js <password> or  node mongo.js <password> <name> <phone>')
//   process.exit(1)
// }



const password = process.argv[2]

const url = process.env.MONGODB_URI

mongoose.connect(url,  { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log('connected to mongoDB'))
    .catch(error => {
        
        console.log('error connecting to mongoDB: ', error.message)
    })

const contractsSchema = new mongoose.Schema({
    name: String,
    number: [String]
})

contractsSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

    }
})



module.exports = mongoose.model('person', contractsSchema)