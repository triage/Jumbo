import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

const Event = ({ event }) => (
  <span>
    <strong>{event.name}</strong><br />
    {event.instructor}
  </span>
)

const Dashboard = ({ user, studio, events, onLoad, onSelectSlot }) => {
  if (!studio.loaded) {
    onLoad(user.data)
  }
  return(
    <div>
      <BigCalendar
        events={events}
        step={15}
        selectable
        onSelectSlot={({start, end}) => {
          onSelectSlot(start,end)
        }}
        components={{
          event: Event
        }}
        min={moment({hour: 5}).toDate()}
        max={moment({hour: 21}).toDate()}
        timeslots={4}
        defaultView={'week'}
        defaultDate={new Date()} />
    </div>
  )
}

export default Dashboard
