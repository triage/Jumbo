import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ScheduleForm from './ScheduleForm'
import { scheduleSubmit } from './ScheduleFormActions'

const mapStateToProps = state => ({
  classes: state.studio.classes || []
})

const mapDispatchToProps = ({
  scheduleSubmit
})

const ScheduleFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleForm)

export default withRouter(ScheduleFormContainer)
