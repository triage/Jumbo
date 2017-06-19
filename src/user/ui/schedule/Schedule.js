import moment from 'moment'
import React from 'react'

const format = 'ddd, MMM D, H:mm a'

const Schedule = ({ schedule, scheduleLoad }) => {
  if (!schedule) {
    return (
      <p>Not Found</p>
    )
  }

  console.log('render!')
  console.log(schedule)

  return (
    <div>
      <h2>{schedule.class.name}</h2>
      <h3>{schedule.instructor}</h3>
      <h4>{moment(schedule.dates.start).format(format)} - {moment(schedule.dates.end).format(format)}</h4>
    </div>
  )
}

export default Schedule
