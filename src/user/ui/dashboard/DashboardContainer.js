import { connect } from 'react-redux'
import Dashboard from './Dashboard'
// import { loginUser } from './LoginButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClassCreate: (event) => {

    }
    // onLoginUserClick: (event) => {
    //   event.preventDefault();

    //   dispatch(loginUser())
    // }
  }
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default DashboardContainer
