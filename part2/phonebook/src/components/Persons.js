import React  from 'react'
import personsServices from '../services/persons' 

const Persons = ({showPersons, setPersons, persons, setShowPersons}) => {
    return (
        <div>
            {
            showPersons.map((person)=> (
                <li  key={person.id}>
                    <b> {person.name}: {person.number} </b>
                    <button onClick={() => {
                        let result = window.confirm(`dalete ${person.name} ?`)
                        if(!result) return

                        personsServices.deletePerson(person.id)
                        .then(()=>{
                            setShowPersons(
                                showPersons.filter((p)=> person.id != p.id )
                            )
                            setPersons(persons.filter(
                                (p)=>p.id != person.id
                            ))
                        })
                    }}> delete {person.name} </button>
                </li>
             ))
            }
        </div>
    )
}

export default Persons