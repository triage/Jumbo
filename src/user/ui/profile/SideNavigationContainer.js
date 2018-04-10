import { connect } from 'react-redux'
import SideNavigation from './SideNavigation'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state, ownProps) => ({
  user: state.user.data,
  type: state.user.data.type,
})

const mapDispatchToProps = {}

const SideNavigationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SideNavigation))

export default SideNavigationContainer
