import { connect } from 'react-redux'
import { Schedule, ScheduleJSON } from 'data/schedule/Schedule'
import { match } from 'react-router'
import { User, UserJSON } from 'data/user/User'
import { scheduleLoad } from 'data/schedule/ScheduleActions'
import ScheduleDetail from './ScheduleDetail'
import { spotPurchase, spotCancel, scheduleCancel, scheduleComplete } from './ScheduleDetailActions'

interface State {
  schedules: [ScheduleJSON]
  user: {
    data: UserJSON
    date: Date
  }
}

const mapStateToProps = (state: State, ownProps: { match: match<{ address: string}> }) => {
  const schedule = state.schedules.find((found: {address: string}) => found.address === ownProps.match.params.address)
  const reserved = schedule ? schedule.reserved : false
  return {
    user: new User(state.user.data),
    address: ownProps.match.params.address,
    schedule: schedule ? new Schedule(schedule) : null,
    reserved,
    date: state.user.date, // this is shitty
  }
}

const mapDispatchToProps = {
  scheduleLoad,
  scheduleCancel,
  scheduleComplete,
  spotPurchase,
  spotCancel,
}

const ScheduleDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScheduleDetail)

export default ScheduleDetailContainer
