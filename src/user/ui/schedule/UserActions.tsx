import React, { PureComponent, FormEvent } from 'react'
import { reduxForm, Field, InjectedFormProps, SubmitHandler } from 'redux-form'
import { Schedule } from 'model/Schedule'
import { User } from 'model/User'
import UserType from 'user/data/user/UserType'
import { eth } from 'util/eth'

interface Props extends InjectedFormProps {
  user: User
  location: object
  history: object
  handleSubmit: SubmitHandler
  pristine: boolean
  submitting: boolean
  scheduleCancel: (address: string, reason: string, history: object) => void
  scheduleComplete: (address: string, history: object) => void
  spotPurchase: (schedule: Schedule, address: string, history: Object, location: Object) => void
  spotCancel: (schedule: Schedule, address: string, history: object, location: object) => void
  schedule: Schedule
}

interface State {
  timer?: NodeJS.Timer,
  name?: string,
  inputValid: boolean
}

class UserActions extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props, {
      inputValid: false,
      timer: null,
      name: null,
    })
  }

  onAddressChanged(event: FormEvent<HTMLInputElement>) {
    if (this.state.timer) {
      clearTimeout(this.state.timer)
    }
    this.setState({
      inputValid: false,
      name: undefined,
      timer: global.setTimeout(
        () => {
          eth.Individual().deployed().then((entity: { getName: { call: (value: string) => Promise<string> }}) => 
            entity.getName.call(event.currentTarget.value)).then((name: string) => {
              this.setState({
                inputValid: false,
                name,
              })
            })
        },
        1000),
    } as State)
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
    } = this.props

    if (user.type === UserType.studio) {
      // studio can complete contract
      const balance = eth.web3().fromWei(schedule.balance)

      // studio can only cancel if current date is before class
      if (new Date() < schedule.dates.start.toDate()) {
        return (
          <form
            onSubmit={
              handleSubmit((values: {reason: string}) => {
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
      }

      return (
        <button
          className="cta"
          onClick={() => {
            scheduleComplete(schedule.address, history)
          }}
        >Complete class and withdraw ${balance}
        </button>
      )
    } else if (user.type === UserType.individual || user.type === UserType.reseller) {
      const price = user.type === UserType.individual ? schedule.price.individual : schedule.price.reseller
      if (schedule.reserved) {
        if (new Date().valueOf() < schedule.dates.cancellation.toDate().valueOf()) {
          return (
            <button
              type="button"
              className="cta destructive"
              onClick={() => spotCancel(schedule, user.address, history, location)}
            >
                Cancel and refund
            </button>
          )
        }
        return (
          <span>The cancellation window of this class has past.</span>
        )
      }
      if (new Date().valueOf() < schedule.dates.purchase.toDate().valueOf()) {
        if (user.type === UserType.reseller) {
          return (
            <form
              onSubmit={handleSubmit((values: { address: string }) => {
                  spotPurchase(schedule, values.address, history, location)
                })}
            >
              <div>
                <div>
                  <Field
                    style={{ float: 'left' }}
                    name="address"
                    component="input"
                    type="text"
                    placeholder="User Address"
                    onChange={(event: FormEvent<HTMLInputElement>) => this.onAddressChanged(event)}
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
              onClick={() => {
                  spotPurchase(schedule, user.address, history, location)
                }}
            >
              {`Buy class for ${eth.web3().fromWei(price)}`}
            </button>
          </div>
        )
      }
      return (
        <span>The purchase window of this class has past.</span>
      )
    }
    return null
  }
}

export default reduxForm({
  // a unique name for the form
  form: 'userActions',
})(UserActions)
