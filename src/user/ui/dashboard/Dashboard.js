import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

const Dashboard = ({ user, studio, schedules, onLoad, onSelectSlot }) => {
  if (!studio.loaded) {
    onLoad(user.data)
  }

  return(
    <div>
      <link rel="stylesheet" type="text/css" href="/react-big-calendar.css"></link>
      <BigCalendar
        events={schedules}
        step={15}
        selectable
        onSelectSlot={({start, end}) => {
          onSelectSlot(start,end)
        }}
        min={moment({hour: 5}).toDate()}
        max={moment({hour: 21}).toDate()}
        timeslots={4}
        defaultView='week'
        defaultDate={new Date()} />
    </div>
  )
}

export default Dashboard
