import React from 'react'
import UserType from 'src/user/model/UserType'
import eth from 'src/util/eth'
import { Field } from 'redux-form'

const UserActions = props => {
  const {
    user,
    location,
    history,
    handleSubmit,
    pristine,
    submitting,
    scheduleCancel,
    scheduleComplete,
    spotPurchase,
    spotCancel,
    schedule,
  } = props;

  if (user.type === UserType.studio) {
    const balance = eth.web3().fromWei(schedule.balance)
    //studio can only cancel if current date is before class
    if (new Date() < new Date(schedule.dates.start)) {
      return (
        <form
          onSubmit={handleSubmit(values => {
            scheduleCancel(schedule.address, values.reason, history)
          })}
        >
          <div>Balance: {balance} eth</div>
          <span>Cancel:</span>
          <Field name="reason" component="input" type="text" placeholder="cancellation reason" />
          <input disabled={pristine || submitting} type="submit" value="Cancel" />
        </form>
      )
    } else {
      //studio can complete contract
      return (
        <button onClick={event => {
        console.log('clicked')
        scheduleComplete(schedule.address, history)
        }}>Complete class and withdraw ${balance}</button>
      )
    }
  } else if (user.type === UserType.individual || user.type === UserType.reseller) {
    const price = user.type === UserType.individual ? schedule.price.individual : schedule.price.reseller
    if (schedule.reserved) {
      if (new Date().valueOf() < new Date(schedule.dates.cancellation).valueOf()) {
        return (
          <button type="button" onClick={event => spotCancel(schedule, user.address, history, location)}>
            Cancel and refund
          </button>
        )
      } else {
        return (
          <span>The cancellation window of this class has past.</span>
        )
      }
    } else {
      if (new Date().valueOf() < new Date(schedule.dates.purchase).valueOf()) {
        return (

          <button type="button" onClick={event => {
            spotPurchase(schedule, user.address, history, location)
            }}>
            {`Buy class for ${eth.web3().fromWei(price)}`}
          </button>
        )
      } else {
        return (
          <span>The purchase window of this class has past.</span>
        )
      }
    }
  }
}

export default UserActions
