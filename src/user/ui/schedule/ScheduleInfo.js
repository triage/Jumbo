import React from 'react'
import moment from 'moment'
import eth from 'util/eth'
import UserType from 'user/model/UserType'
import UserActions from './UserActions'

const format = {
  long: 'ddd, MMM D, H:mm a',
  short: 'H:mm a',
  date: 'ddd, MMM D'
}
const style = {
  balance: {
    fontSize: 30,
  },
  cancel: {

  },
  userActions: {
    float: 'right',
    textAlign: 'center',
    backgroundColor: '#eceff1',
    padding: 25,
    width: '25%',
  },
  left: {
    float: 'left',
  }
}

const Balance = props => {
  const { schedule, user } = props
  if (user.type !== UserType.studio) {
    return null
  }
  const balance = eth.web3().fromWei(schedule.balance)
  return <div style={style.balance}>{balance} eth</div>
}

const ScheduleInfo = props => {
  const {
    schedule,
  } = props

  const url = {
    schedule: `http://localhost:8000/#/address/${schedule.address}`,
    studio: `/studio/${schedule.studio.address}`,
  }
  const date = moment(schedule.dates.start).format(format.date)
  const start = moment(schedule.dates.start).format(format.short)
  const end = moment(schedule.dates.end).format(format.short)

  return (
    <div>
      <div className="section z-depth-2">
        <div style={style.left}>
          <div className="name">{schedule.class.name} at <a href={url.studio}>{schedule.studio.name}</a></div>
          <div className="address"><a href={url.schedule} target="_blank">{schedule.address}</a></div>
          <div className="contactDetails">{schedule.studio.contactDetails}</div>
        </div>
        <div style={style.userActions}>
          <Balance {...props} />
          <p>
            Instructor: {schedule.instructor}<br />
            {date}<br />
            {start} - {end}<br />
          </p>
          <UserActions {...props} style={style.userActions} />
        </div>
        <div style={{ clear: 'both' }} />
      </div>
    </div>
  )
}

export default ScheduleInfo
