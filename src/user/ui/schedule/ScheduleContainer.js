import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import { scheduleLoad } from '../../model/ScheduleActions'
import { browserHistory } from 'react-router'
import { scheduleDatesChanged } from '../scheduleForm/ScheduleFormActions'

const loadSchedule = (address) => { scheduleLoad(address) };

const mapStateToProps = (state, ownProps) => ({
  schedule: state.studio.schedules.find(found => {
    if (found.address === ownProps.address) {
      return found;
    }
  })
})

const mapDispatchToProps = (dispatch) => (
  loadSchedule
)

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default DashboardContainer
