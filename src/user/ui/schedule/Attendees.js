import React from 'react'
import UserType from 'user/model/UserType'

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

export default Attendees
