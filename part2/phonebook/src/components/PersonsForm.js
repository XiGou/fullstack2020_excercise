import React  from 'react'

const PersonsForm = ({persons, setPersons, newPerson, setNewPerson, showPersons,setShowPersons }) => {
    const addPerson = (event) => {
        event.preventDefault()
        
        const names = persons.map((person)=>person.name)
    
        if(names.includes(newPerson.name)){
          let name = newPerson.name
          alert(`${name}  is already added to phonebook`)
          return
        }
    
        setPersons(persons.concat(newPerson))
        setShowPersons(persons.concat(newPerson))
        setNewPerson({})
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