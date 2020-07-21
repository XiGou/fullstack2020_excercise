import React from 'react'

import OneResult from './OneResult'

function Result({showCountries, setShowCountries}){




    const handleSubmit= (event) => {
        event.preventDefault()
        
        // console.log(event.target.value)
        let targetCountry = showCountries.filter(
            (item) => item.name === event.target.value 
        )
        // console.log(targetCountry)
        setShowCountries(targetCountry)
    }


    if(showCountries.length ===1){
        

        return (
            <div>
                <OneResult showCountries={showCountries} /> 
            </div>
        )
    }else if(showCountries.length >1 && showCountries.length <= 10){
        return (
            <div>
                {showCountries.map((C)=>{
                        return (
                            <div key={C.name}>
                                <span > {C.name}</span>
                                <button value={C.name} onClick={handleSubmit}> show</button>
                            </div>
                        )
                    }
                )}
            </div>
        )
    }else if(showCountries.length === 0){
        return (<p> No one.</p>)
    }else {
        return( <p> Too many.</p>)
    }





}
export default Result