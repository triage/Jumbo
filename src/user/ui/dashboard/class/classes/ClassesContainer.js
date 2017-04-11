import { connect } from 'react-redux'
import ClassesSelector from "./ClassesSelector"

const mapStateToProps = (state, ownProps) => {
  return {
    classes: state.studio.classes
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
)(ClassesSelector)

export default ClassesContainer
