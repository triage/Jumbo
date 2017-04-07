import { connect } from 'react-redux'
import Classes from "./Classes"

const mapStateToProps = (state, ownProps) => {
  return {
    classes: state.classes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClassTap: (event, studio) => {
      if(!event) {
        return
      }
      event.preventDefault()
    }
  }
}

const ClassesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Classes)

export default ClassesContainer
