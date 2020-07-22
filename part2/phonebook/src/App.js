import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonsForm from './components/PersonsForm'
import Filter from './components/Filter'
import axios from 'axios'
import personsServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])


  
  const [showPersons, setShowPersons] = useState(persons)

  const [ newPerson, setNewPerson ] = useState({})
  const [ filterWord, setfilterWord ] = useState('')


  useEffect(()=>{
    console.log('effect')
    personsServices.getAll()
    .then((response)=>{
      setPersons(response.data)
      setShowPersons(response.data)
    })
  }, [])

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
      
      <Persons 
      showPersons={showPersons}
      setShowPersons={setShowPersons}
      persons={persons}
      setPersons={setPersons}
      />

    <div>debug: {newPerson.name} : {newPerson.number}: {filterWord}</div>
      
    </div>
  )
}

export default App