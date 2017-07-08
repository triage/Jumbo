import React from 'react'
import ClassesSelector from 'src/user/ui/class/classes/ClassesSelector'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import {
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

const ScheduleForm = props => {

  const {
    classes,
    date,
    spots,
    instructor,
    price,
    scheduleClassChanged,
    scheduleInstructorChanged,
    numberSpotsChanged,
    numberResellerSpotsChanged,
    priceIndividualChanged,
    priceResellerChanged,
    scheduleSubmit,
    history
  } = props;

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        scheduleSubmit(history)
      }}>
      <h2>Class:</h2>
      <ClassesSelector
        classes={classes}
        onClassSelect={event => {
          event.preventDefault();
          const address = event.target.selectedOptions[0].dataset.class
          scheduleClassChanged(address, history);
        }}
      />

      <h2>Starts at:</h2>
      <h4>{moment(date.start).format(format)}</h4>

      <h2>Ends at:</h2>
      <h4>{moment(date.end).format(format)}</h4>

      <h2>Instructor Name</h2>
      <input
        name="instructor"
        type="text"
        onChange={event => {
          scheduleInstructorChanged(event.target.value)
        }}
        value={instructor}
      />

      <h2>Number of spots</h2>
      <NumericInput
        min={0}
        max={100}
        value={spots.total}
        onChange={value => {
          numberSpotsChanged(value)
        }}
      />

      <h2>Reseller spots</h2>
      <NumericInput
        min={0}
        max={spots.total}
        value={spots.reseller}
        onChange={value => {
          numberResellerSpotsChanged(value)
        }}
      />

      <h2>Price (individual)</h2>
      <input
        type="text"
        onChange={event => {
          priceIndividualChanged(event.target.value)
        }}
        value={price.individual}
      />

      <h2>Price (reseller)</h2>
      <input
        type="text"
        onChange={event => {
          priceResellerChanged(event.target.value)
        }}
        value={price.reseller}
      />

      <hr />
      <input type="submit" />
    </form>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    classes: state.studio.classes || [],
    date: state.schedule.date,
    spots: state.schedule.spots,
    instructor: state.schedule.instructor,
    price: state.schedule.price
  }
}

const mapDispatchToProps = ({
  scheduleClassChanged,
  scheduleInstructorChanged,
  numberSpotsChanged,
  numberResellerSpotsChanged,
  priceIndividualChanged,
  priceResellerChanged,
  scheduleSubmit
})

const ScheduleFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleForm)

export default withRouter(ScheduleFormContainer)
