import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

const Event = ({ event }) => (
  <span>
    <strong>{event.name}</strong><br />
    {event.instructor}
  </span>
)

const Studio = (props) => {
  const {
    studio, address, loaded, loading, studioLoad, history,
  } = props

  let { events } = props

  if (!loading && !studio) {
    studioLoad(address)
    return null
  } else if (!loaded) {
    return null
  }

  const url = {
    studio: `http://localhost:8000/#/address/${studio.address}`,
  }

  const defaultView = 'week'
  const views = ['week', 'day', 'agenda']
  const toolbar = true

  events = events.map(event => Object.assign({}, event, {
    url: `/schedule/${event.address}`,
  }))

  return (
    <div>
      <div className="section z-depth-2">
        <div className="name">{studio.name}</div>
        <div className="address"><a href={url.studio} target="_blank">{studio.address}</a></div>
        <div className="contactDetails">{studio.contactDetails}</div>
      </div>
      <div className="z-depth-2">
        <BigCalendar
          events={events}
          step={15}
          selectable
          onSelectEvent={(event) => {
          history.push(`/schedule/${event.address}`)
        }}
          components={{
          event: Event,
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
    </div>
  )
}

export default Studio
