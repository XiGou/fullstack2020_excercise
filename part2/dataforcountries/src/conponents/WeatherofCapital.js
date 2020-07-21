import React from 'react'


function WeatherofCapital({weatherRst, capital}){
    return (
        <div>
            <h2>Weather in {capital}</h2>  
            <p><b> Temperature: </b> {weatherRst.current.temperature} Celcius  </p>   
            <img src={weatherRst.current.weather_icons[0]} alt="weather icon"/>
            <p><b> Wind: </b> {weatherRst.current.wind_speed} mph direction {weatherRst.current.wind_dir}  </p>  
        </div>
    )
}

export default WeatherofCapital