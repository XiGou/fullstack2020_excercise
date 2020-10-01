import React from 'react'
import { useSelector, useDispatch } from 'react-redux'


const Notification = () => {
  const notiText = useSelector( state => state.notification.text )
  console.log(notiText)
  if('' === notiText)return null

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
      {notiText}
    </div>
  )
}

export default Notification