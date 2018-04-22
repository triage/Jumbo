import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import SideNavigation from './SideNavigation'

const mapStateToProps = state => ({
  user: state.user.data,
  type: state.user.data.type,
})

const mapDispatchToProps = {}

const SideNavigationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SideNavigation))

export default SideNavigationContainer
