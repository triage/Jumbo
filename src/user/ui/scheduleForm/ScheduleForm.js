import React from 'react'
import ClassesSelector from 'src/user/ui/class/classes/ClassesSelector'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { scheduleDateChanged, scheduleClassChanged } from './ScheduleFormActions'

const ScheduleForm = ({ classes, dateSelected, onClassSelect, onDateSelect }) => (
  <form>

    <h2>Class:</h2>
    <ClassesSelector classes={classes} onClassSelect={onClassSelect} />

    <h2>Date</h2>
    <DatePicker
      selected={dateSelected}
      onChange={onDateSelect} />

    <h2>Instructor Name</h2>
    <input type="text" name="instructor" />
  </form>
)

const mapStateToProps = (state, ownProps) => {
  return {
    classes: state.studio.classes,
    dateSelected: state.schedule.date
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClassSelect: (event) => {
      event.preventDefault();
      debugger
      dispatch(scheduleClassChanged())
    },
    onDateSelect: (date) => {
      dispatch(scheduleDateChanged(date))
    }
  }
}

const ScheduleFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleForm)

export default ScheduleFormContainer
