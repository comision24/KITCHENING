import React from 'react'
import PropTypes from 'prop-types'

const Alert = ({message}) => {
  return (
    <div className="alert alert-danger" role="alert">
      {message}
    </div>
  )
}

Alert.propTypes = {}

export default Alert