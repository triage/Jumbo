import moment from 'moment'
import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'
import UserType from 'src/user/model/UserType'
import eth from 'src/util/eth'

const format = 'ddd, MMM D, H:mm a'
const style = {
  address: {

  },
  balance: {

  },
  cancel: {

  }
}

const ClassInfo = props => {
  const {
    user,
    schedule
  } = props
  if (user.type === UserType.studio) {
    return null
  }
  return <p>{schedule.class.description}</p>
}

const UserActions = props => {
  const {
    user,
    history,
    handleSubmit,
    pristine,
    submitting,
    scheduleCancel,
    spotPurchase,
    spotCancel,
    schedule,
  } = props;

  if (user.type === UserType.studio) {
    return (
      <form
        onSubmit={handleSubmit(values => {
          scheduleCancel(schedule.address, values.reason, history)
        })}
      >
        <div>Balance: {eth.web3().fromWei(schedule.balance)} eth</div>
        <span style={style.cancel}>Cancel:</span>
        <Field name="reason" component="input" type="text" placeholder="cancellation reason" />
        <input disabled={pristine || submitting} type="submit" value="Cancel" />
      </form>
    )
  } else if (user.type === UserType.individual) {
    if (schedule.reserved) {
      return (
        <button type="button" onClick={event => spotCancel(schedule, user.address, history)}>
          Cancel and refund
        </button>
      )
    } else {
      return (
        <button type="button" onClick={event => {
          spotPurchase(schedule, user.address, history)
          }}>
          {`Buy class for ${eth.web3().fromWei(schedule.price.individual)}`}
        </button>
      )
    }
  }
}

const Attendees = props => {
  const {
    schedule,
    user
  } = props

  if (user.type === UserType.individual) {
    return null
  }
  const attendees = schedule.attendees.map(attendee => (
    <div key={attendee.name}>{attendee.name}</div>
  ))
  return (
    <div>
      <p>Attendees:</p>
      {attendees}
    </div>
  )
}

const ScheduleInfo = props => {
  const {
    schedule,
  } = props

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
      <Attendees {...props} />
    </div>
  )
}

class Schedule extends PureComponent {

  componentWillMount() {
    console.log('componentWillMount')
    const {
      address,
      scheduleLoad
    } = this.props;
    scheduleLoad(address);
  }

  render() {
    const {
      schedule,
      scheduleLoad,
      address
    } = this.props;

    if (!schedule || schedule.reserved === undefined) {
      scheduleLoad(address)
      return null
    }

    return (
      <div>
        <ScheduleInfo {...this.props} />
        <ClassInfo {...this.props} />
        <hr />
        <UserActions {...this.props} />
      </div>

    )
  }
}

export default reduxForm({
  // a unique name for the form
  form: 'cancel'
})(Schedule)
