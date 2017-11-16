import React from 'react'
import UserType from 'src/user/model/UserType'
import moment from 'moment'
import Attendees from './Attendees'
import UserActions from './UserActions'

const format = {
  long: 'ddd, MMM D, H:mm a',
  short: 'H:mm a'
}
const style = {
  address: {
    width: 70,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    float: 'left',
  },
  balance: {

  },
  cancel: {

  },
  name: {
    fontSize: 24,
  },
  userActions: {
    float: 'right',
    textAlign: 'center',
    backgroundColor: '#eceff1',
    padding: 25,
    width: '25%',
  },
  left: {
    float: 'left',
  }
}

const ScheduleInfo = props => {
  const {
    schedule,
  } = props

  const url = `https://etherscan.io/address/${schedule.address}`
  const start = moment(schedule.dates.start).format(format.long)
  const end = moment(schedule.dates.end).format(format.short)

  return (
    <div className="section">
      <div style={style.left}>
        <div style={style.name}>{schedule.class.name}</div>
        <div style={style.address}><a href={url} target="_blank">{schedule.address}</a></div>
      </div>
      <div style={style.userActions}>
        <p>Instructor: {schedule.instructor}</p>
        <p>{start} - {end}</p>
        <UserActions {...props} style={style.userActions} />
      </div>
      <div style={{ clear: 'both' }} />
      <Attendees {...props} />
    </div>
  )
}

export default ScheduleInfo
