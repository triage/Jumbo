import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CreateClassForm from './CreateClassForm'
import { classCreate } from 'src/user/model/ClassesActions'

let input = {}

const mapStateToProps = state => ({
    studio: state.user.data,
})

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateClass: (event, studio, history) => {
      if(!event) {
        return
      }
      event.preventDefault();
      dispatch(classCreate(studio, input.name, input.description, history))
    },
    onNameChanged: (event) => {
      input.name = event.target.value
    },
    onDescriptionChanged: (event) => {
      input.description = event.target.value
    }
  }
}

const CreateClassContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateClassForm))

export default CreateClassContainer
