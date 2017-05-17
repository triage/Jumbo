import React from 'react'
import ClassesSelector from 'src/user/ui/class/classes/ClassesSelector'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { scheduleDateChanged, scheduleClassChanged } from './ScheduleFormActions'

const ScheduleForm = ({ classes, dateSelected, onClassSelect, onDateSelect, onInstructorChanged, onSubmit }) => (
  <form onSubmit={onSubmit}>

    <h2>Class:</h2>
    <ClassesSelector classes={classes} onClassSelect={onClassSelect} />

    <h2>Date</h2>
    <DatePicker
      selected={dateSelected}
      onChange={onDateSelect} />

    <h2>Instructor Name</h2>
    <input type="text" onChange={onInstructorChanged(this)} name="instructor" />
    <input type="submit" />
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
      const classObj = event.target.selectedOptions[0].dataset.class
      dispatch(scheduleClassChanged(classObj))
    },
    onDateSelect: (date) => {
      dispatch(scheduleDateChanged(date))
    },
    onInstructorChanged: (event) => {
      console.log(event)
    },
    onSubmit: (event) => {
      debugger
      event.preventDefault()
    }
  }
}

const ScheduleFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleForm)

export default ScheduleFormContainer
