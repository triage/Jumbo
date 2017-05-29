import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import { studioLoad } from '../../model/StudioActions'

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
    }
  }
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default DashboardContainer
