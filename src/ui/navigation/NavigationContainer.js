import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Navigation from './Navigation'

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = {}

const NavigationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Navigation))

export default NavigationContainer
