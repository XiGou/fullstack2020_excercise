import React, { useState } from 'react'



const Notification = ({message}) => {
    if(null === message)return null
    
    const inlineStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }
    return (
        <div className='Notification' style={inlineStyle}>
            {message}
        </div>
    )
}

export default Notification