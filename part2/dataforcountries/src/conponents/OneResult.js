import React, {useEffect, useState} from 'react'
import axios from 'axios'
import WeatherofCapital from './WeatherofCapital'

function OneResult({showCountries}){

    const [weatherRst, setWeatherRst] = useState({})
    const api_key = process.env.REACT_APP_API_KEY

    
    let C = showCountries[0]
    
    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${C.capital}}`)
        .then(
            (reponse) => {setWeatherRst(reponse.data)}
        )
    }, [api_key, C.capital])

    if(Object.keys(weatherRst).length === 0){
        return (
            <div>
                Not yet done.
            </div>
        )
    }
    console.log(weatherRst)
    

    if(weatherRst.success === false ){
        return (
            <div>
                weather info apply false
            </div>
        )
    }

    return (
        <div>
            <h1>{C.name}</h1>
            <p>capital: {C.capital}</p>
            <p>population: {C.population}</p>

            <h2>Languages</h2>    
            {
                <ul>
                    {
                        C.languages.map((language)=><li key={language.iso639_1}>{language.name}</li>)
                    }
                </ul>
            }

            <img src={C.flag} alt="flag"/>

            <WeatherofCapital weatherRst={weatherRst}
             capital={C.capital}
             />
        </div>
    )

}
export default OneResult