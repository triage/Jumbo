import React from 'react'
import PropTypes from 'prop-types'

const ClassInfo = props => {
  const {
    schedule,
  } = props
  return (
    <div className="section z-depth-2">
      <h5>About this class:</h5>
      <p style={{ whiteSpace: 'pre-line' }}>{schedule.class.description}</p>
    </div>
  )
}

ClassInfo.propTypes = {
  schedule: PropTypes.object.isRequired,
}

export default ClassInfo
