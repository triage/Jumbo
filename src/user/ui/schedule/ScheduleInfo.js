import React from 'react'
import UserType from 'src/user/model/UserType'
import moment from 'moment'
import Attendees from './Attendees'

const format = 'ddd, MMM D, H:mm a'
const style = {
  address: {

  },
  balance: {

  },
  cancel: {

  }
}

const ScheduleInfo = props => {
  const {
    schedule,
  } = props

  const url = `https://etherscan.io/address/${schedule.address}`
  const start = moment(schedule.dates.start).format(format)
  const end = moment(schedule.dates.end).format(format)

  return (
    <div>
      <h2>{schedule.class.name}</h2>
      <span style={style.address}>
        (<a href={url} target="_blank">{schedule.address}</a>)
        </span>
      <h3>{schedule.instructor}</h3>
      <h4>{start} - {end}</h4>
      <Attendees {...props} />
    </div>
  )
}

export default ScheduleInfo
