import * as React from 'react'
import { Schedule } from 'model/Schedule'
import { User } from 'model/User'
import UserType from 'user/data/user/UserType'
import UserActions from './UserActions'

interface ScheduleInfoProps {
  user: User
  schedule: Schedule
}

const format = {
  date: 'ddd, MMM D',
  short: 'H:mm a',
}

const Balance: React.SFC<ScheduleInfoProps> = props => {
  const { user, schedule } = props
  if (user.type !== UserType.studio) {
    return null
  }
  return <div className="balance">{schedule.balance} eth</div>
}

const ScheduleInfo: React.SFC<ScheduleInfoProps> = props => {
  const { schedule } = props
  const url = {
    schedule: `http://localhost:8000/#/address/${schedule.address}`,
    studio: `/studio/${schedule.studio.address}`,
  }

  return (
    <div>
      <div className="section z-depth-2">
        <div className="left">
          <div className="name">{schedule.class.name} at <a href={url.studio}>{schedule.studio.name}</a></div>
          <div className="address"><a href={url.schedule} target="_blank">{schedule.address}</a></div>
          <div className="contactDetails">{schedule.studio.contactDetails}</div>
        </div>
        <div className="userActions">
          <Balance {...props} />
          <p>
            Instructor: {schedule.instructor}<br />
            {schedule.dates.date.format(format.date)}<br />
            {schedule.dates.start.format(format.short)} - {schedule.dates.end.format(format.short)}<br />
          </p>
          <UserActions {...props} />
        </div>
        <div style={{ clear: 'both' }} />
      </div>
    </div>
  )
}

export { ScheduleInfo }
