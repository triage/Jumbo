import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import UserType from 'src/user/model/UserType'

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

const Event = ({ event }) => (
  <span>
    <strong>{event.name}</strong><br />
    {event.instructor}
  </span>
)

const EventAgenda = ({event}) => (
  <div>
    <a href={event.url}>
      <strong>{event.name}</strong><br />
      {event.instructor}
    </a>
  </div>
)

const Dashboard = props => {
  const {
    user,
    history,
  } = props;

  let {
    events
  } = props;

  events = events.map(event => {
    return Object.assign({}, event, {
      url: `schedule/${event.address}`
    })
  })

  if (user.data.type === UserType.individual) {
    events = events.filter(event => {
      return event.reserved
    })
  }

  document.title = `JUMBO - ${user.data.name}`

  const earliestSchedulableClassHoursBefore = 1
  const defaultView = user.data.type === UserType.studio ? 'week' : 'agenda'
  const views = user.data.type === UserType.studio ? ['week', 'day', 'agenda'] : ['agenda']
  const toolbar = user.data.type === UserType.studio ? true : false

  return(
    <div style={{ marginTop: 20, }}>
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
          event: Event,
          agenda: {
            event: EventAgenda
          }
        }}
        min={moment({hour: 5}).toDate()}
        max={moment({hour: 21}).toDate()}
        timeslots={4}
        toolbar={toolbar}
        views={views}
        defaultView={defaultView}
        defaultDate={new Date()} />
    </div>
  )
}

export default Dashboard
