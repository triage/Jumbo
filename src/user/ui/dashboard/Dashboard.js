import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import { Link } from 'react-router'

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

const Dashboard = ({ user, studio, schedules, onLoad }) => {
  if (!studio.loaded) {
    onLoad(user.data)
  }

  return(
    <div>
      <link rel="stylesheet" type="text/css" href="/react-big-calendar.css"></link>
      <Link to="schedule/new" className="pure-menu-link">Add New Schedule</Link>
      <BigCalendar
        events={schedules}
        step={15}
        min={moment({hour: 5}).toDate()}
        max={moment({hour: 21}).toDate()}
        timeslots={4}
        defaultView='week'
        defaultDate={new Date()} />
    </div>
  )
}

export default Dashboard
