import { connect } from 'react-redux'
import SignUpForm from './SignUpForm'
import { userSignup } from './SignUpFormActions'

const mapStateToProps = state => ({})

const mapDispatchToProps = {
  userSignup
}

const SignUpFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm)

export default SignUpFormContainer
