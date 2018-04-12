import React from 'react'
import PropTypes from 'prop-types'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import UserType from 'user/model/UserType'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

const Event = ({ event }) => (
  <span>
    <strong>{event.name}</strong><br />
    {event.instructor}
  </span>
)

Event.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.string.isRequired,
    instructor: PropTypes.string.isRequired,
  }).isRequired,
}

const EventAgenda = ({ event }) => (
  <div>
    <a href={event.url}>
      <strong>{event.name}</strong><br />
      {event.instructor}
    </a>
  </div>
)

EventAgenda.propTypes = {
  event: PropTypes.shape({
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    instructor: PropTypes.string.isRequired,
  }).isRequired,
}

const DashboardReseller = props => {
  if (props.reseller.studios.length > 0) {
    return (
      <div className="section z-depth-2 half">
        <h5>Studios that recognize you as a reseller:</h5>
        <table className="bordered">
          <thead>
            <tr>
              <th>
                Name
              </th>
              <th>
                Address
              </th>
            </tr>
          </thead>
          <tbody>
            {props.reseller.studios.map(reseller => (
              <tr key={reseller.address}>
                <td>{reseller.name}</td>
                <td>{reseller.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="section z-depth-2 half">
      <h5>Your address:</h5>
      <p>{props.user.data.address}</p>
    </div>
  )
}

DashboardReseller.propTypes = {
  user: PropTypes.shape({
    data: PropTypes.shape({
      address: PropTypes.string.isRequired,
    }),
  }).isRequired,
  reseller: PropTypes.shape({
    studios: PropTypes.arrayOf(PropTypes.shape({
      address: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
}

const Dashboard = props => {
  const {
    user,
    history,
  } = props

  let {
    events,
  } = props

  document.title = `JUMBO - ${user.data.name}`

  if (user.data.type === UserType.reseller) {
    return <DashboardReseller {...props} />
  }

  events = events.map(event => Object.assign({}, event, {
    url: `schedule/${event.address}`,
  }))

  if (user.data.type === UserType.individual) {
    events = events.filter(event => event.reserved)
  }

  const earliestSchedulableClassHoursBefore = 1
  const defaultView = user.data.type === UserType.studio ? 'week' : 'agenda'
  const views = user.data.type === UserType.studio ? ['week', 'day', 'agenda'] : ['agenda']
  const toolbar = user.data.type === UserType.studio

  return (
    <div className="z-depth-2">
      <BigCalendar
        events={events}
        step={15}
        selectable
        onSelectSlot={({ start, end }) => {
          const earliest = new Date().valueOf() - (earliestSchedulableClassHoursBefore * 60 * 60 * 1000)
          if (new Date(start).valueOf() <= earliest) {
            return
          }
          history.push('schedule/new', {
            start,
            end,
          })
        }}
        onSelectEvent={event => {
          history.push(`schedule/${event.address}`)
        }}
        components={{
          event: Event,
          agenda: {
            event: EventAgenda,
          },
        }}
        min={moment({ hour: 5 }).toDate()}
        max={moment({ hour: 21 }).toDate()}
        timeslots={4}
        toolbar={toolbar}
        views={views}
        defaultView={defaultView}
        defaultDate={new Date()}
      />
      <div style={{ clear: 'both' }} />
    </div>
  )
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
}

export default Dashboard
