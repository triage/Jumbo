import { connect } from 'react-redux'
import Dashboard from './Dashboard'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    studio: state.studio
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default DashboardContainer
