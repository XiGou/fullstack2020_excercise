const initialFilter = { text: '' }


const setFilter = ( text ) => {
  return ({
    type: 'SET_FILTER',
    data:{text}
  })
}


const filterReducer = (state = initialFilter, action) => {
  switch ( action.type ) {
    case 'SET_FILTER':
      const fltr = action.data.text
      // console.log(fltr)
      return { ...state, text: fltr}

    default:
      return state
  }
}

export default filterReducer
export {
  setFilter
}
