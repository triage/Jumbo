import React, { PureComponent } from 'react'
import { reduxForm } from 'redux-form'
import eth from 'src/util/eth'
import UserType from 'src/user/model/UserType'
import ClassInfo from './ClassInfo'
import ScheduleInfo from './ScheduleInfo'
import Attendees from './Attendees'

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

    eth.Schedule().at(schedule.address).then(deployed => {
      const event = deployed.SpotPurchased({ spotType: 1 }, { fromBlock: 0 })
      event.get((error, result) => {
        if (error) {
          console.log(`error:${error}`)
        } else if (result) {
          console.log(result)
        }
      })
    })

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
  form: 'cancel'
})(Schedule)
