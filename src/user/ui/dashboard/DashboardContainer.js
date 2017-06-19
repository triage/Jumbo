import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import { studioLoad } from '../../model/StudioActions'
import { browserHistory } from 'react-router'
import { scheduleDatesChanged } from '../scheduleForm/ScheduleFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    studio: state.studio,
    events: state.studio.schedules.map((schedule) => {
      return {
        address: schedule.address,
        start: new Date(schedule.dates.start),
        end: new Date(schedule.dates.end),
        name: schedule.class ? schedule.class.name : 'n/a',
        instructor: schedule.instructor
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
      browserHistory.push('schedule/new', {
        startDate: start,
        endDate: end
      })
    },
    onSelectEvent: (event) => {
      browserHistory.push(`schedule/${event.address}`);
    }
  }
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default DashboardContainer
