import { connect } from 'react-redux'
import CreateClassForm from './CreateClassForm'
import { classCreate } from 'src/user/model/ClassesActions'

let input = {}

const mapStateToProps = (state, ownProps) => {
  return {
    studio: state.user.data,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateClass: (event, studio) => {
      if(!event) {
        return
      }
      event.preventDefault();
      dispatch(classCreate(studio, input.name, input.description))
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
)(CreateClassForm)

export default CreateClassContainer
