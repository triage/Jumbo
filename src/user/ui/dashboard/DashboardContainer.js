import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import { studioLoad } from '../../model/StudioActions'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    studio: state.studio,
    schedules: state.studio.schedules
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: (address) => {
      debugger
      dispatch(studioLoad(address))
      // dispatch(studioInfoLoad(address))
    }
  }
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default DashboardContainer
