import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert as React_Noti } from 'react-bootstrap'


const Notification = () => {
  const notiText = useSelector( state => state.notification.text )
  // console.log(notiText)
  if('' === notiText)return null


  return (
    <div className='Notification containerd'>
      <React_Noti variant='success'>
        {notiText}
      </React_Noti>
    </div>
  )
}

export default Notification