import React, {useEffect, useState}from 'react'
import './App.css'
import axios from 'axios'
import Result from './conponents/Result'



function App() {
  const [allCountries, setAllCountries] = useState([])
  const [showCountries, setShowCountries] = useState([])
  const [filterWord, setFilterWord] = useState('')
  
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all")
    .then(response =>{
      setAllCountries(response.data)
      
    })
  }, [])


  const handleFilterChg = (event)=> {
    setFilterWord(event.target.value)
    
    let countriesShouldbeShow = allCountries.filter(
        (C) => {
          return (C.name.indexOf(event.target.value) !== -1)
        }
      )
      
      setShowCountries(countriesShouldbeShow)
        
      
      
    



  }

  

  return (
    <div>
      <form>
        <span>find countries:</span>
        <input value={filterWord} onChange={handleFilterChg} />
      </form>
      <Result showCountries={showCountries} setShowCountries={setShowCountries} />
      {/* <p>key {process.env.REACT_APP_API_KEY}</p> */}
    </div>
  );
}

export default App;
