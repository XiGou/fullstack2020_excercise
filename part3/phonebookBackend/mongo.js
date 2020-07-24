const mongoose = require('mongoose')



if(process.argv.length !== 3 && process.argv.length !== 5){
    console.log(process.argv.length)
    console.log('Please provide the password as an argument: node mongo.js <password> or  node mongo.js <password> <name> <phone>')
  process.exit(1)
}



const password = process.argv[2]

const url = 
`mongodb+srv://fullstack:${password}@cluster0.zd8sp.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url,  { useNewUrlParser: true, useUnifiedTopology: true })

const contractsSchema = new mongoose.Schema({
    name: String,
    number: String
})

const contracts = mongoose.model('person', contractsSchema)



if(process.argv.length === 3){
    contracts.find({}).then(
        result => {
            console.log('phone book')
            result.forEach(result => console.log(result.name, result.number, result._id))
            mongoose.connection.close()
        }
    )
    
} else if(process.argv.length === 5) {
    let name = process.argv[3]
    let number = process.argv[4]

    const newPerson =new contracts({
        name:name,
        number:number
    })

    newPerson.save().then(result=>{
        
        console.log('new person saved.')
        mongoose.connection.close()
    })
}