import React from 'react'
import PropTypes from 'prop-types'
import UserType from 'user/data/user/UserType'

const Attendees = props => {
  const {
    schedule,
    user,
  } = props

  if (user.type !== UserType.studio) {
    return null
  }
  const attendees = schedule.attendees.map(attendee => (
    <div key={attendee.name}>{attendee.name}</div>
  ))
  return attendees.length > 0 && (
    <div className="section z-depth-2">
      <h5>Attendees:</h5>
      {attendees}
    </div>
  )
}

Attendees.propTypes = {
  schedule: PropTypes.shape({
    attendees: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
}

export default Attendees
