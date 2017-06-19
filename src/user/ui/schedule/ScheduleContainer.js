import { connect } from 'react-redux'
import Schedule from './Schedule'
import { scheduleLoad } from '../../model/ScheduleActions'
import { browserHistory } from 'react-router'
import { scheduleDatesChanged } from '../scheduleForm/ScheduleFormActions'

const loadSchedule = (address) => { scheduleLoad(address) };

const mapStateToProps = (state, ownProps) => {
  return {
    schedule: state.studio.schedules.find(found => {
      if (found.address === ownProps.address) {
        return found;
      }
    })
  }
}

const mapDispatchToProps = (dispatch) => (
  loadSchedule
)

const ScheduleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Schedule)

export default ScheduleContainer
