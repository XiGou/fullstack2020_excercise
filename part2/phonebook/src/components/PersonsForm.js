import React  from 'react'
import axios from 'axios'
import personsServices from '../services/persons' 



const PersonsForm = ({persons, setPersons, newPerson, setNewPerson, showPersons,setShowPersons, setNotiMessage }) => {
    const addPerson = (event) => {
        event.preventDefault()
        
        const names = persons.map((person)=>person.name)
    
        if(names.includes(newPerson.name)){
          let name = newPerson.name
          // alert(`${name}  is already added to phonebook`)
         
          let id = persons.find((p)=>p.name === newPerson.name).id

          let notUpdatePerson = persons.find((p)=>p.name === newPerson.name)
          let updatedPerson = {...notUpdatePerson, number:[...notUpdatePerson.number, newPerson.number]}

          personsServices.updateNumber(id, updatedPerson)
          .then(
            ()=>{
              setPersons(persons.map((p)=>p.name===newPerson.name?updatedPerson:p))
              setShowPersons(showPersons.map((p)=>p.name===newPerson.name?updatedPerson:p))
              
              setNotiMessage(`update ${newPerson.name}'s Number.`)
              setTimeout(() => {
                console.log()
                setNotiMessage(null)
              }, 5000);

              setNewPerson({})
            }
          )
          .catch(
            (error) => {
              setNotiMessage(` ${newPerson.name} doesn't exist on server.`)
              setTimeout(() => {
                console.log()
                setNotiMessage(null)
              }, 5000);

              setPersons(persons.filter((p)=>p.name!=newPerson.name))
              setShowPersons(showPersons.filter((p)=>p.name!=newPerson.name))
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

            setNotiMessage(`Added ${newPerson.name}.`)
            setTimeout(() => {
              console.log()
              setNotiMessage(null)
            }, 5000);

            setNewPerson({})
          }
        )
        .catch(error => {
          setNotiMessage(JSON.stringify(error.response.data))
         
        })
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