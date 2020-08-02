import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisuble] = useState(false)

  Togglable.propTypes = {
    buttonLabelWhenhide: PropTypes.string.isRequired,
    buttonLabelWhenshow:PropTypes.string.isRequired
  }

  const hiddenWhenvisible = { display: visible? 'none' : '' }
  const showWhenvisile = { display: visible?  '' : 'none' }

  const toggleVisible = () => {
    setVisuble(!visible)
  }
  useImperativeHandle (ref, () => {
    return {
      toggleVisible
    }
  })

  return (
    <div>
      <div style={hiddenWhenvisible}>
        <button onClick={toggleVisible}> {props.buttonLabelWhenhide} </button>
      </div>
      <div style={showWhenvisile}>
        {props.children}
        <button onClick={toggleVisible}> {props.buttonLabelWhenshow} </button>
      </div>
    </div>
  )

})

Togglable.displayName = 'Togglable'

export default Togglable