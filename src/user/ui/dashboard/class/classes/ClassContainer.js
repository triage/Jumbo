import { connect } from 'react-redux'
import ClassOption from "./ClassOption"

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

const ClassContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassOption)

export default ClassContainer
