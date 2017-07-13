import moment from 'moment'
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import UserType from 'src/user/model/UserType'

const format = 'ddd, MMM D, H:mm a'
const style = {
  address: {

  },
  balance: {

  },
  cancel: {

  }
}

const UserActions = props => {
  const {
    user,
    history,
    handleSubmit,
    pristine,
    submitting,
    scheduleCancel,
    schedule
  } = props;

  if (user.type === UserType.studio) {
    return (
      <form
        onSubmit={handleSubmit(values => {
          scheduleCancel(schedule.address, values.reason, history)
        })}
      >
        <span style={style.cancel}>Cancel:</span>
        <Field name="reason" component="input" type="text" placeholder="cancellation reason" />
        <input disabled={pristine || submitting} type="submit" value="Cancel" />
      </form>
    )
  } else if (user.type === UserType.individual) {
    return (
      <button onClick={event => console.log('hi!')} value={`Buy class for ${schedule.price.individual}`} />
    )
  }
}

const Schedule = props => {

  const {
    user,
    schedule
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
      <UserActions {...props} />
    </div>

  )
}

export default reduxForm({
  // a unique name for the form
  form: 'cancel'
})(Schedule)
