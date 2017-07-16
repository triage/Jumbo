import { connect } from 'react-redux'
import ScheduleDetail from './ScheduleDetail'
import { scheduleLoad } from '../../model/ScheduleActions'
import { scheduleCancel } from './ScheduleDetailActions'
import { spotPurchase, spotCancel } from './ScheduleDetailActions'

const mapStateToProps = (state, ownProps) => ({
  user: state.user.data,
  address: ownProps.match.params.address,
  schedule: state.schedules.find(found =>  found.address === ownProps.match.params.address)
})

const mapDispatchToProps = {
  scheduleLoad,
  scheduleCancel,
  spotPurchase,
  spotCancel
}

const ScheduleDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleDetail)

export default ScheduleDetailContainer
