import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import { Link } from 'react-router'

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

const Dashboard = ({ user, onLoad }) => {

  onLoad()

  return(
    <div>
      <link rel="stylesheet" type="text/css" href="/react-big-calendar.css"></link>
      <Link to="schedule/new" className="pure-menu-link">Add New Schedule</Link>
      <BigCalendar
        events={[]}
        startAccessor='startDate'
        endAccessor='endDate' />
    </div>
  )
}

export default Dashboard
