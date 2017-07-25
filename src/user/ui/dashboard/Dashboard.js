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
    events,
    history,
  } = props;

  const earliestSchedulableClassHoursBefore = 1

  return(
    <div>
      <BigCalendar
        events={events}
        step={15}
        selectable
        onSelectSlot={({start, end}) => {
          const earliest = new Date().valueOf() - earliestSchedulableClassHoursBefore * 60 * 60 * 1000
          if (new Date(start).valueOf() <= earliest) {
            return
          }
          history.push('schedule/new', {
            start,
            end
          })
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
