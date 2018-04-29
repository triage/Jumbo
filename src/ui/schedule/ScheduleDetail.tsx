import React, { PureComponent } from 'react'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { Schedule } from 'data/schedule/Schedule'
import { User } from 'data/user/User'
import UserType from 'data/user/UserType'
import { ClassInfo } from './ClassInfo'
import { ScheduleInfo } from './ScheduleInfo'
import { Attendees } from './Attendees'

export interface ScheduleDetailProps {
  user: User
  address: string
  schedule?: Schedule
  location: object
  history: object
  reserved: boolean
  date?: Date
  scheduleLoad: (address: string) => void
  scheduleCancel: (address: string, reason: string, history: object) => void
  scheduleComplete: (address: string, history: object) => void
  spotPurchase: (schedule: string, address: string, price: number, history: Object, location: Object) => void
  spotCancel: (schedule: string, address: string, history: object, location: object) => void
}

class ScheduleDetail extends PureComponent<ScheduleDetailProps & InjectedFormProps<{}, ScheduleDetailProps>> {
  render() {
    const {
      user,
      schedule,
      scheduleLoad,
      address,
    } = this.props

    if (!schedule ||
      (user.type === UserType.individual && schedule.reserved === undefined) ||
      (user.type === UserType.studio && schedule.attendees === undefined)) {
      scheduleLoad(address)
      return null
    }

    document.title = `${schedule.class.name}`

    return (
      <div>
        <ScheduleInfo {...this.props} />
        <Attendees {...this.props} />
        <ClassInfo {...this.props} />
      </div>
    )
  }
}

export default reduxForm({
  // a unique name for the form
  form: 'cancel',
})(ScheduleDetail)
