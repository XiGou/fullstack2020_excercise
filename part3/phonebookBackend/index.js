require('dotenv').config()

const express = require('express')
const app = express()
const Person = require('./models/person')
app.use(express.json())

let morgan = require('morgan')

morgan.token('postData', function (req) {
    if(req.method === 'POST'){
        return JSON.stringify(req.body) 
    }else {
        return ''
    }     
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))


const cors = require('cors')

app.use(cors())



// app.use(express.static('build'))

app.get('/api/persons', (req, res) => {

    // console.log("get persons")
    Person.find({}).then((persons) => {
        res.json(persons.map(p => p.toJSON()))
    })
    
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    
    
    // console.log(result, "IN?")
    const person = new Person({
        name: body.name,
        number:body.number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON())
    })
        .catch(error => next(error))

})

app.put('/api/persons/:id', (req, res, next) => {

    const id = String(req.params.id)

    const body = req.body

    Person.updateOne({_id: id}, body, (err) =>{
        if(err){
            next(err)
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
    Person.findByIdAndRemove(id).then(() => {
        
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
    }else if(error.name === 'ValidationError') {
        return  response.status(400).json({error: error.message})
    }

    next(error)
}
// handler of requests with result to errors
app.use(errorHandler)


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})