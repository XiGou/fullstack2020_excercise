import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  Togglable.propTypes = {
    buttonLabelWhenhide: PropTypes.string.isRequired,
    buttonLabelWhenshow:PropTypes.string.isRequired
  }

  const hiddenWhenvisible = { display: visible? 'none' : '' }
  const showWhenvisile = { display: visible?  '' : 'none' }

  const toggleVisible = () => {
    setVisible(!visible)
  }
  useImperativeHandle (ref, () => {
    return {
      toggleVisible
    }
  })

  return (
    <div>
      <div style={hiddenWhenvisible}>
        <Button onClick={toggleVisible}> {props.buttonLabelWhenhide} </Button>
      </div>
      <div style={showWhenvisile}>
        {props.children}
        <Button onClick={toggleVisible}> {props.buttonLabelWhenshow} </Button>
      </div>
    </div>
  )

})

Togglable.displayName = 'Togglable'

export default Togglable