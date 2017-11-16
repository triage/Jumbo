import React, { PureComponent } from 'react'
import { reduxForm } from 'redux-form'
import UserType from 'src/user/model/UserType'
import ClassInfo from './ClassInfo'
import ScheduleInfo from './ScheduleInfo'

class Schedule extends PureComponent {

  render() {    

    const {
      user,
      schedule,
      scheduleLoad,
      address
    } = this.props;

    if (!schedule ||
      (user.type === UserType.individual && schedule.reserved === undefined) ||
      (user.type === UserType.studio && schedule.attendees === undefined)) {
        scheduleLoad(address)
      return null
    }

    document.title = `${schedule.class.name}`

    return (
      <div>
        <div>
          <ScheduleInfo {...this.props} />
        </div>
        <ClassInfo {...this.props} />
      </div>
    )
  }
}

export default reduxForm({
  // a unique name for the form
  form: 'cancel'
})(Schedule)
