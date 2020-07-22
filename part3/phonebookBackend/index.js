const express = require('express')
const app = express()
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

let persons = [
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 1
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      },
      {
        "name": "手动阀",
        "number": "222",
        "id": 6
      }
    ]


const generateNewId = () => {
    return Math.round(Math.random()*100000000000000)
}


app.get('/api/persons', (req, res) => {
    
    // console.log("get persons")
    res.json(persons)
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if(!body.name || !body.number){
        res.status(400).end("missing something.")
    } 

    // check id name is already exists.
    let nameAlresdyIn = persons.find((person) => {
        
        return person.name === body.name
    })
    console.log(nameAlresdyIn, "IN?")

    if(nameAlresdyIn){
        res.json({error: "name already in."})
         

    }else {
        const person = {
            name: body.name,
            number:body.number,
            id:generateNewId()
        }
    
        persons = persons.concat(person)
    
        res.json(person)

    }

})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    const person = persons.find(person=>String(person.id)===id)

    if(person){
        res.json(person)

    }else {
        res.status(404).end()
    }
})

app.get('/api/info', (req, res) => {
    let date = new Date()
    res.send(`<p>Phone book has info for ${persons.length} people</p>  <p>${date}</p>           `)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.param.id
    persons = persons.filter((person)=>String(person.id) !== id)
    // console.log(persons)
    res.status(204).end()
})


const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})