import moment from 'moment'
import React from 'react'

const format = 'ddd, MMM D, H:mm a'
const style = {
  address: {

  },
  balance: {

  }
}

const Schedule = ({ schedule, scheduleLoad, scheduleCancel }) => {
  if (!schedule) {
    return (
      <p>Not Found</p>
    )
  }

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
      <hr />
      <span style={style.balance}>${schedule.balance}</span>
      <div id="attendees">
        attendees ...
      </div>
      <hr />
      <input type="button" onMouseUp={() => {scheduleCancel(schedule.address)}} value="Cancel" />
    </div>
  )
}

export default Schedule
