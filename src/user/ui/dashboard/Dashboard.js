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

const Dashboard = props => {

  const {
    user,
    studio,
    events,
    studioLoad,
    scheduleDatesChanged,
    history,
  } = props;

  if (!studio.loaded) {
    studioLoad(user.data)
  }
  return(
    <div>
      <BigCalendar
        events={events}
        step={15}
        selectable
        onSelectSlot={({start, end}) => {   
          scheduleDatesChanged(start, end)
          history.push('schedule/new')
        }}
        onSelectEvent={event => { 
          history.push(`schedule/${event.address}`)
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
