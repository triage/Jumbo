import { connect } from 'react-redux'
import SideNavigation from './SideNavigation'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state, ownProps) => ({
  user: state.user.data
})

const mapDispatchToProps = (dispatch) => {}

const SideNavigationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SideNavigation))

export default SideNavigationContainer
