import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CreateClassForm from './CreateClassForm'
import { classCreate } from './CreateClassActions'

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  classCreate,
}

const CreateClassContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CreateClassForm))

export default CreateClassContainer
