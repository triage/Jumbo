import { connect } from 'react-redux'
import ScheduleDetail from './ScheduleDetail'
import { scheduleLoad } from '../../model/ScheduleActions'
import { scheduleCancel, scheduleComplete } from './ScheduleDetailActions'
import { spotPurchase, spotCancel } from './ScheduleDetailActions'

const mapStateToProps = (state, ownProps) => {
  const schedule = state.schedules.find(found =>  found.address === ownProps.match.params.address)
  const reserved = schedule ? schedule.reserved : false

  debugger
  return {
    user: state.user.data,
    address: ownProps.match.params.address,
    schedule,
    reserved
  }
}

const mapDispatchToProps = {
  scheduleLoad,
  scheduleCancel,
  scheduleComplete,
  spotPurchase,
  spotCancel
}

const ScheduleDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleDetail)

export default ScheduleDetailContainer
