import { connect } from 'react-redux'
import Dashboard from './Dashboard'
// import { loginUser } from './LoginButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    classes: state.studio.classes
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
