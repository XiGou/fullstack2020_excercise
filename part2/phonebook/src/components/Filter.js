import React from 'react'

const Filter = ({filterWord, setfilterWord, setShowPersons, persons})=> {
    
  const handleFilterChg = (event) => {
    setfilterWord(event.target.value)

    // console.log(event.target.value)
    if(event.target.value === ''){
      setShowPersons(persons.concat())
    }
    else{
      setShowPersons(persons.filter(
        (person) => {
          console.log((person.name.indexOf(event.target.value) ))
          return (person.name.indexOf(event.target.value) !== -1)
        }
      ))
      
    }
    // console.log(persons)
    // console.log(showPersons)
  }


    return (
        <form>
            filter shown with:
            <input value={filterWord} onChange={handleFilterChg} />
        </form>
    )
}







export default Filter