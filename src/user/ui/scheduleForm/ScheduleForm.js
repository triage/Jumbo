import React from 'react'
import ClassesSelector from 'src/user/ui/class/classes/ClassesSelector'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
  scheduleDateChanged,
  scheduleTimeStartChanged,
  scheduleTimeEndChanged,
  scheduleClassChanged,
  scheduleInstructorChanged,
  scheduleSubmit,
  numberSpotsChanged,
  numberResellerSpotsChanged,
  priceIndividualChanged,
  priceResellerChanged
} from './ScheduleFormActions'
import NumericInput from 'react-numeric-input';

const ScheduleForm = ({
  classes,
  dateSelected,
  spots,
  timeStartSelected,
  timeEndSelected,
  onClassSelect,
  onDateChanged,
  onTimeStartChanged,
  onTimeEndChanged,
  onInstructorChanged,
  onNumberOfSpotsChanged,
  onNumberOfResllerSpotsChanged,
  onPriceIndividualChanged,
  onPriceResellerChanged,
  onSubmit }) => (
    <form onSubmit={onSubmit}>

      <h2>Class:</h2>
      <ClassesSelector classes={classes} onClassSelect={onClassSelect} />

      <h2>Date Start:</h2>
      <DatePicker
        selected={dateSelected}
        onChange={onDateChanged} />

      <h2>Time Start:</h2>
      <input
        type="text"
        value={timeStartSelected}
        onChange={(event) => {
          onTimeStartChanged(event)
        }} />

      <h2>Time End:</h2>
      <input
        type="text"
        value={timeEndSelected}
        onChange={(event) => {
          onTimeEndChanged(event)
        }} />

      <h2>Instructor Name</h2>
      <input type="text" onChange={(event) => {
        onInstructorChanged(event)
      }} name="instructor" />

      <h2>Number of spots</h2>
      <NumericInput min={0} max={100} value={spots.total} onChange={(valueAsNumber) => {
        onNumberOfSpotsChanged(valueAsNumber)
      }}/>

      <h2>Reseller spots</h2>
      <NumericInput min={0} max={spots.total} value={spots.reseller} onChange={(valueAsNumber) => {
        onNumberOfResllerSpotsChanged(valueAsNumber)
      }}/>

      <h2>Price (individual)</h2>
      <input type="text" onChange={(event) => {
        onPriceIndividualChanged(event)
      }} />

      <h2>Price (reseller)</h2>
      <input type="text" onChange={(event) => {
        onPriceResellerChanged(event)
      }} />

      <hr />
      <input type="submit" />
    </form>
)

const mapStateToProps = (state, ownProps) => {
  return {
    classes: state.studio.classes,
    dateSelected: state.schedule.date,
    spots: state.schedule.spots,
    timeStartSelected: state.schedule.time.start,
    timeEndSelected: state.schedule.time.end,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClassSelect: (event) => {
      event.preventDefault();
      const address = event.target.selectedOptions[0].dataset.class
      dispatch(scheduleClassChanged(address))
    },
    onDateChanged: (date) => {
      dispatch(scheduleDateChanged(date))
    },
    onTimeStartChanged: (event) => {
      dispatch(scheduleTimeStartChanged(event.target.value))
    },
    onTimeEndChanged: (event) => {
      dispatch(scheduleTimeEndChanged(event.target.value))
    },
    onInstructorChanged: (event) => {
      dispatch(scheduleInstructorChanged(event.target.value))
    },
    onNumberOfSpotsChanged: (value) => {
      dispatch(numberSpotsChanged(value))
    },
    onNumberOfResllerSpotsChanged: (value) => {
      dispatch(numberResellerSpotsChanged(value))
    },
    onPriceIndividualChanged: (event) => {
      dispatch(priceIndividualChanged(event.target.value))
    },
    onPriceResellerChanged: (event) => {
      dispatch(priceResellerChanged(event.target.value))
    },
    onSubmit: (event) => {
      event.preventDefault()
      dispatch(scheduleSubmit())
    }
  }
}

const ScheduleFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleForm)

export default ScheduleFormContainer
