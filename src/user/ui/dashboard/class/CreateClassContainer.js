import { connect } from 'react-redux'
import CreateClassForm from './CreateClassForm'
import createClass from './CreateClassActions'

let input = {}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateClass: (event) => {
      if(!event) {
        return
      }
      event.preventDefault();

      dispatch(createClass(input.name, input.description))
    },
    onNameChanged: (event) => {
      console.log(event.target.value)
      input.name = event.target.value
    },
    onDescriptionChanged: (event) => {
      console.log(event.target.value)
      input.description = event.target.value
    }
  }
}

const CreateClassContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateClassForm)

export default CreateClassContainer
