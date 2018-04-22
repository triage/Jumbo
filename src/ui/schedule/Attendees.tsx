import React from 'react'
import UserType from 'data/user/UserType'
import { Schedule } from 'data/schedule/Schedule';
import { User } from 'data/user/User';

interface Props {
  schedule: Schedule
  user: User
}

const Attendees: React.SFC<Props> = props => {
  const {
    schedule,
    user,
  } = props

  if (user.type !== UserType.studio) {
    return null
  }
  const attendees = schedule.attendees!.map((attendee: { name: string}) => (
    <div key={attendee.name}>{attendee.name}</div>
  ))

  return (attendees.length > 0 && (
    <div className="section z-depth-2">
      <h5>Attendees:</h5>
      {attendees}
    </div>
  )) || null
}

export default Attendees
