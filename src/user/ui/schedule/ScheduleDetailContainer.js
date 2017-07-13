import { connect } from 'react-redux'
import ScheduleDetail from './ScheduleDetail'
import { scheduleLoad } from '../../model/ScheduleActions'
import { scheduleCancel } from './ScheduleDetailActions'

const mapStateToProps = (state, ownProps) => ({
  user: state.user.data,
  schedule: state.studio.schedules.find(found => {
    if (found.address === ownProps.match.params.address) {
      return found
    }
    return false
  })
})

const mapDispatchToProps = {
  scheduleLoad,
  scheduleCancel
}

const ScheduleDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleDetail)

export default ScheduleDetailContainer
