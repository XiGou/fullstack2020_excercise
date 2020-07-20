import React  from 'react'

const Persons = ({showPersons}) => {
    return (
        <div>
            {
            showPersons.map((person)=> (<p key={person.name}><b> {person.name}: {person.number} </b></p> ))
            }
        </div>
    )
}

export default Persons