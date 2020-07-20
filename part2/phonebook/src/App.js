import React, { useState } from 'react'
import Persons from './components/Persons'
import PersonsForm from './components/PersonsForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  
  const [showPersons, setShowPersons] = useState(persons)

  const [ newPerson, setNewPerson ] = useState({})
  const [ filterWord, setfilterWord ] = useState('')



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
      filterWord={filterWord}
      setfilterWord={setfilterWord}
      setShowPersons={setShowPersons}
      persons={persons}
      />

      <h1>Add New One</h1>
      <PersonsForm 
        persons={persons}
        setPersons={setPersons}
        showPersons={showPersons}
        setShowPersons={setShowPersons}
        newPerson={newPerson}
        setNewPerson={setNewPerson}
      />

      <h2>Numbers</h2>
      
      <Persons showPersons={showPersons} />

    <div>debug: {newPerson.name} : {newPerson.number}: {filterWord}</div>
      
    </div>
  )
}

export default App