import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import SignUpForm from './SignUpForm'
import { userSignup } from './SignUpFormActions'

const mapStateToProps = state => ({
  error: state.error,
})

const mapDispatchToProps = {
  userSignup,
}

const SignUpFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpForm)

export default withRouter(SignUpFormContainer)
