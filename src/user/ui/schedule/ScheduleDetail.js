import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import eth from 'util/eth'
import UserType from 'user/data/user/UserType'
import ClassInfo from './ClassInfo'
import ScheduleInfo from './ScheduleInfo'
import Attendees from './Attendees'

class ScheduleDetail extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    schedule: PropTypes.object,
    scheduleLoad: PropTypes.func.isRequired,
    address: PropTypes.string.isRequired,
  }

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

    eth.Schedule().at(schedule.address).then(deployed => {
      const event = deployed.SpotPurchased({ spotType: 1 }, { fromBlock: 0 })
      event.get(() => {})
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
  form: 'cancel',
})(ScheduleDetail)
