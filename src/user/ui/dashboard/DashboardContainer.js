import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import { studioLoad } from '../../model/StudioActions'
import { browserHistory } from 'react-router'
import { scheduleDatesChanged } from '../scheduleForm/ScheduleFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    studio: state.studio,
    schedules: state.studio.schedules.map((schedule) => {
      return {
        start: schedule.dates.start,
        end: schedule.dates.end,
        title: schedule.class
      }
    })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: (address) => {
      dispatch(studioLoad(address))
    },
    onSelectSlot: (start, end) => {
      dispatch(scheduleDatesChanged(start, end))
      browserHistory.push('schedule', {
        startDate: start,
        endDate: end
      })
    }
  }
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default DashboardContainer
