import { connect } from 'react-redux'
import ScheduleDetail from './ScheduleDetail'
import { scheduleLoad, scheduleCancel } from '../../model/ScheduleActions'

const mapStateToProps = (state, ownProps) => ({
  schedule: state.studio.schedules.find(found => {
    if (found.address === ownProps.address) {
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
