import React from 'react'
import UserType from 'src/user/model/UserType'

const Attendees = props => {
  const {
    schedule,
    user
  } = props

  if (user.type !== UserType.studio) {
    return null
  }
  const attendees = schedule.attendees.map(attendee => (
    <div key={attendee.name}>{attendee.name}</div>
  ))
  return (
    <div>
      <p>Attendees:</p>
      {attendees}
    </div>
  )
}

export default Attendees
