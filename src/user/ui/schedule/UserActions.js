import React, { PureComponent } from 'react'
import UserType from 'src/user/model/UserType'
import eth from 'src/util/eth'
import { reduxForm, Field } from 'redux-form'

// const style = {
//   button: {
//     background: "#00bfa5",
//     width: '100%',
//     color: 'white',
//     border: 'none',
//     padding: '8pt'
//   }
// }

class UserActions extends PureComponent {

  constructor() {
    super()
    this.state = {
      name: null,
      timer: null,
      inputValid: false,
    }
  }

  onAddressChanged(event) {
    clearTimeout(this.state.timer)
    this.setState({
      inputValid: false,
      name: null,
      timer: setTimeout(() => {
        eth.Individual().deployed().then(reseller => {
          return reseller.getName.call(event.target.value)
        }).then(name => {
          this.setState({
            inputValid: false,
            name
          })
        })
      }, 1000)
    })
  }

  render() {
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
  } = this.props;

    if (user.type === UserType.studio) {

      //studio can complete contract
      const balance = eth.web3().fromWei(schedule.balance)
      
      //studio can only cancel if current date is before class
      if (new Date() < new Date(schedule.dates.start)) {
        return (
          <form
            onSubmit={handleSubmit(values => {
              scheduleCancel(schedule.address, values.reason, history)
            })}
          >
            <hr />
            <Field
              name="reason"
              component="input"
              type="text"
              placeholder="cancellation reason"
            />
            <input
              className="cta destructive"
              disabled={pristine || submitting}
              type="submit"
              value="Cancel"
            />
          </form>
        )
      } else {
        
        return (
          <button className="cta" onClick={event => {
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
            <button
              type="button"
              className="cta destructive"
              onClick={event => spotCancel(schedule, user.address, history, location)}>
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
          if (user.type === UserType.reseller) {
            return (
              <form
                onSubmit={handleSubmit(values => {
                  spotPurchase(schedule, values.address, history, location)
                })}
              >
                <div>
                  <div>
                    <Field
                      style={{ float: 'left' }}
                      name="address" component="input"
                      type="text"
                      placeholder="User Address"
                      onChange={event => this.onAddressChanged(event)}
                    />
                    {this.state.name}
                  </div>
                  <button
                    type="submit"
                    className="cta"
                    disabled={pristine || submitting || this.state.inputValid}
                  >
                    {`Buy class for ${eth.web3().fromWei(price)}`}
                  </button>
                </div>
              </form>
            )
          }
          return (
            <div>
              <button
                type="button"
                className="cta"
                onClick={event => {
                  spotPurchase(schedule, user.address, history, location)
                }}>
                {`Buy class for ${eth.web3().fromWei(price)}`}
              </button>
            </div>
          )
        } else {
          return (
            <span>The purchase window of this class has past.</span>
          )
        }
      }
    }
  }
}

export default reduxForm({
  // a unique name for the form
  form: 'userActions'
})(UserActions)
