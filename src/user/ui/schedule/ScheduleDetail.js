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

const Schedule = props => {

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
    <form
      onSubmit={handleSubmit(values => {
        scheduleCancel(schedule.address, values.reason)
      })}
    >
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

        <Field name="reason" component="input" type="text" placeholder="cancellation reason" />
        <input disabled={pristine || submitting} type="submit" value="Cancel" />
      </div>
    </form>
  )
}

export default reduxForm({
  // a unique name for the form
  form: 'cancel'
})(Schedule)
