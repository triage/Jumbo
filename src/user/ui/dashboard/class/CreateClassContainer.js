import { connect } from 'react-redux'
import CreateClass from './CreateClass'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateClass: (event, state) => {
      if(!event) {
        return
      }
      event.preventDefault();

      // dispatch(loginUser())
    },
    onNameChanged: (event) => {
      console.log(event.target.value)
      
    },
    onDescriptionChanged: (event) => {
      console.log(event.target.value)
    }
  }
}

const CreateClassContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateClass)

export default CreateClassContainer
