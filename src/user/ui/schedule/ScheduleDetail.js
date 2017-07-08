import moment from 'moment'
import React from 'react'
import { Field, reduxForm } from 'redux-form'

const format = 'ddd, MMM D, H:mm a'
const style = {
  address: {

  },
  balance: {

  },
  cancel: {

  }
}

let Schedule = props => {

  const {
    schedule,
    scheduleLoad,
    scheduleCancel,
    handleSubmit,
    pristine,
    submitting
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
      <span style={style.cancel}>Cancel:</span>
      <form onSubmit={handleSubmit(values => {
        console.log(values)
      })}>
        <Field name="reason" component="input" type="text" placeholder="cancellation reason"/>
        <input disabled={pristine || submitting} type="submit" value="Cancel" />
      </form>
    </div>
  )
}

Schedule = reduxForm({
  // a unique name for the form
  form: 'cancel'
})(Schedule)

export default Schedule
