import React from 'react'
import moment from 'moment'
import eth from 'src/util/eth'
import UserType from 'src/user/model/UserType'
import UserActions from './UserActions'

const format = {
  long: 'ddd, MMM D, H:mm a',
  short: 'H:mm a',
  date: 'ddd, MMM D'
}
const style = {
  address: {
    width: 70,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    float: 'left',
  },
  balance: {
    fontSize: 30,
  },
  cancel: {

  },
  name: {
    fontSize: 24,
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

  const url = `http://localhost:8000/#/address/${schedule.address}`
  const date = moment(schedule.dates.start).format(format.date)
  const start = moment(schedule.dates.start).format(format.short)
  const end = moment(schedule.dates.end).format(format.short)

  return (
    <div>
      <div className="section z-depth-2">
        <div style={style.left}>
          <div style={style.name}>{schedule.class.name} at {schedule.studio.name}</div>
          <div style={style.address}><a href={url} target="_blank">{schedule.address}</a></div>
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
