import React from 'react'
import UserType from 'data/user/UserType'
import { User } from 'data/user/User';
import { Schedule } from 'data/schedule/Schedule';

const Attendees: React.SFC<{schedule?: Schedule, user: User}> = props => {
  const {
    schedule,
    user,
  } = props

  if (user.type !== UserType.studio) {
    return null
  }
  const attendees = schedule!.attendees!.map((attendee: { name: string}) => (
    <div key={attendee.name}>{attendee.name}</div>
  ))

  return (attendees.length > 0 && (
    <div className="section z-depth-2">
      <h5>Attendees:</h5>
      {attendees}
    </div>
  )) || null
}

export { Attendees }
