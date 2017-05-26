import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import { studioInfoLoad } from '../../model/StudioActions'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    studio: state.studio
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: (address) => {
      dispatch(studioInfoLoad(address))
    }
  }
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default DashboardContainer
