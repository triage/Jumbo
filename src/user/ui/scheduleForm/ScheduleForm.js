import React from 'react'
import ClassesSelector from 'src/user/ui/class/classes/ClassesSelector'
import { connect } from 'react-redux'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import {
  scheduleDateStartChanged,
  scheduleDateEndChanged,
  scheduleClassChanged,
  scheduleInstructorChanged,
  scheduleSubmit,
  numberSpotsChanged,
  numberResellerSpotsChanged,
  priceIndividualChanged,
  priceResellerChanged
} from './ScheduleFormActions'
import NumericInput from 'react-numeric-input';

import 'react-date-picker/index.css'

const format = 'ddd, MMM D, H:mm a'

const ScheduleForm = ({
  classes,
  date,
  spots,
  onClassSelect,
  onDateStartChanged,
  onDateEndChanged,
  onInstructorChanged,
  onNumberOfSpotsChanged,
  onNumberOfResllerSpotsChanged,
  onPriceIndividualChanged,
  onPriceResellerChanged,
  onSubmit }) => (

    <form onSubmit={onSubmit}>

      <h2>Class:</h2>
      <ClassesSelector classes={classes} onClassSelect={onClassSelect} />

      <h2>Starts at:</h2>
      <h4>{moment(date.start).format(format)}</h4>

      <h2>Ends at:</h2>
      <h4>{moment(date.end).format(format)}</h4>

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
    classes: state.studio.classes || [],
    date: state.schedule.date,
    spots: state.schedule.spots,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClassSelect: (event) => {
      event.preventDefault();
      const address = event.target.selectedOptions[0].dataset.class
      dispatch(scheduleClassChanged(address))
    },
    onDateStartChanged: (date) => {
      dispatch(scheduleDateStartChanged(date))
    },
    onDateEndChanged: (date) => {
      dispatch(scheduleDateEndChanged(date))
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
