import React  from 'react'
import axios from 'axios'
import personsServices from '../services/persons' 

const PersonsForm = ({persons, setPersons, newPerson, setNewPerson, showPersons,setShowPersons }) => {
    const addPerson = (event) => {
        event.preventDefault()
        
        const names = persons.map((person)=>person.name)
    
        if(names.includes(newPerson.name)){
          let name = newPerson.name
          // alert(`${name}  is already added to phonebook`)
          let id
          id = persons.find((p)=>p.name === newPerson.name).id

          personsServices.updateNumber(id, newPerson)
          .then(
            ()=>{
              setPersons(persons.map((p)=>p.name===newPerson.name?{...p, number:newPerson.number}:p))
              setShowPersons(showPersons.map((p)=>p.name===newPerson.name?{...p, number:newPerson.number}:p))
              setNewPerson({})
            }
          )


          return
        }

        personsServices.create(newPerson)
        .then(
          (response)=> {
            setPersons(persons.concat(response.data))
            setShowPersons(persons.concat(response.data))
            setNewPerson({})
          }
        )
        //post to server

        
      }
    const handleAddPersonNameChg = (event) => {
    const newObject = {
        name: event.target.value,
        number:newPerson.number
    }
    setNewPerson(newObject)
    }
    const handleAddPersonNumberChg = (event) => {
    const newObject = {
        name: newPerson.name,
        number:event.target.value
    }
    setNewPerson(newObject)
    }
    return (
        <form>
        <div>
          Name: <input  
                value={newPerson.name || ''}
                onChange={handleAddPersonNameChg}/>
        </div>
        <div>
          Number: <input  
                value={newPerson.number || ''}
                onChange={handleAddPersonNumberChg}/>
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
    )
}

export default PersonsForm