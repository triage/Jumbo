import { connect } from 'react-redux'
import { Schedule } from 'model/Schedule'
import ScheduleDetail from './ScheduleDetail'
import { scheduleLoad } from '../../data/schedule/ScheduleActions'
import { spotPurchase, spotCancel, scheduleCancel, scheduleComplete } from './ScheduleDetailActions'

const mapStateToProps = (state, ownProps) => {
  const schedule = state.schedules.find(found => found.address === ownProps.match.params.address)
  const reserved = schedule ? schedule.reserved : false
  return {
    user: state.user.data,
    address: ownProps.match.params.address,
    schedule: new Schedule(schedule),
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
