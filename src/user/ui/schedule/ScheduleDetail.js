import moment from 'moment'
import React from 'react'
import { Field, reduxForm } from 'redux-form'

const format = 'ddd, MMM D, H:mm a'
const style = {
  address: {

  },
  balance: {

  }
}

let Schedule = props => {

  const {
    schedule,
    scheduleLoad,
    scheduleCancel
  } = props;

  if (!schedule) {
    return (
      <p>Not Found</p>
    )
  }

  const url = `https://etherscan.io/address/${schedule.address}`
  const start = moment(schedule.dates.start).format(format)
  const end = moment(schedule.dates.end).format(format)

  return (
    <div>
      <h2>{schedule.class.name}</h2>
      <span style={style.address}>
        (<a href={url} target="_blank">{schedule.address}</a>)
      </span>
      <h3>{schedule.instructor}</h3>
      <h4>{start} - {end}</h4>
      <hr />
      <span style={style.balance}>${schedule.balance}</span>
      <div id="attendees">
        attendees ...
      </div>
      <hr />
      <form onSubmit={values => {
        debugger
        scheduleCancel(values.message)
      }}>
        <Field name="message" component="input" type="text" />
        <button type="submit" onMouseUp={() => {scheduleCancel(schedule.address)}} value="Cancel" />
      </form>
    </div>
  )
}

Schedule = reduxForm({
  // a unique name for the form
  form: 'cancel'
})(Schedule)

export default Schedule
