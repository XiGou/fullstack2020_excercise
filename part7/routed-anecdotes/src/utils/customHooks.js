import {useState} from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const resetfield = (event) => {
    setValue('')
  }

  return {
    forInput:
    {
      type,
      value,
      onChange
    },
    resetfield
  }
}

