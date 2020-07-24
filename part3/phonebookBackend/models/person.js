const mongoose = require('mongoose')



// if(process.argv.length !== 3 && process.argv.length !== 5){
//     console.log(process.argv.length)
//     console.log('Please provide the password as an argument: node mongo.js <password> or  node mongo.js <password> <name> <phone>')
//   process.exit(1)
// }





const url = process.env.MONGODB_URI

mongoose.connect(url,  { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to mongoDB'))
    .catch(error => {
        
        console.log('error connecting to mongoDB: ', error.message)
    })

let uniqueValidator = require('mongoose-unique-validator') 

const contractsSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        unique:true,
        minlength:3
    },
    number: {
        type:[String],
        required:true,
        validate: {
            validator:(v)=>{
                if(v.length < 1)return false
                if(v.reduce((pre, cur) => {
                    return (pre > cur.length)?cur.length:pre 
                }, v[0].length) < 8) return false 
            },
            message: ' Array is empty or number less then 8.' 
        }
    }
})
contractsSchema.plugin(uniqueValidator)

contractsSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

    }
})



module.exports = mongoose.model('person', contractsSchema)