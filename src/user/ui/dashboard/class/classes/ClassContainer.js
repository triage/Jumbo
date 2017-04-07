import { connect } from 'react-redux'
import Class from "./Class"

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
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

const ClassContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Class)

export default ClassContainer
