require('dotenv').config()

const express = require('express')
const app = express()
const Person = require('./models/person')
app.use(express.json())

let morgan = require('morgan')

morgan.token('postData', function (req, res) {
    if(req.method === 'POST'){
        return JSON.stringify(req.body) 
    }else {
        return ""
    }     
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))


const cors = require('cors')
const { response } = require('express')
app.use(cors())





app.get('/api/persons', (req, res) => {
    
    const body = req.body

    // console.log("get persons")
    Person.find({}).then((persons) => {
        res.json(persons.map(p => p.toJSON()))
    })
    
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if(!body.name || !body.number){
        res.status(400).end("missing something.")
    } 

    // check id name is already exists.
    Person.findOne({name: body.name})
        .then(result => {
            // console.log(result, "IN?")

            if(result){
                res.json({error: "name already in."})
            }else {
                const person = new Person({
                    name: body.name,
                    number:body.number
                })
            
                person.save().then(savedPerson => {
                    res.json(savedPerson.toJSON())
                })

            }

        })  

})

app.put('/api/persons/:id', (req, res, next) => {

    const id = String(req.params.id)

    const body = req.body

    Person.updateOne({_id: id}, body, (err, raw) =>{
        if(err){
            next(error)
        }else {
            Person.findOne({name: body.name}, (err, raw) => {
                if(!err) res.json(raw)
                else res.json({error: err.message})
            })
            
        }
        
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    
    const id = req.params.id
    
    
    Person.findById(id).then(person => {
        if(person){
            res.json(person)
    
        }else {
            res.status(404).end()
        }
    })
    .catch( error => {
        next(error)
    })
    
})

app.get('/api/info', (req, res) => {
    let date = new Date()
    Person.count().then(result => {
        res.send(`<p>Phone book has info for ${result} people</p>  <p>${date}</p> `)

    })
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    
    //id is valid
    Person.findByIdAndRemove(id).then(result => {
        
        res.status(204).end()
    })
    .catch(error => next(error))
    
    
})



const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)



const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } 

    next(error)
}
// handler of requests with result to errors
app.use(errorHandler)


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})