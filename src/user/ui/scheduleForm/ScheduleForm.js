import React from 'react'
import { Field, reduxForm } from 'redux-form'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import NumericInput from 'react-numeric-input';
import ClassesSelector from 'src/user/ui/class/classes/ClassesSelector'

import 'react-date-picker/index.css'

const format = 'ddd, MMM D, H:mm a'

const ScheduleForm = props => {

  const {
    classes,
    scheduleSubmit,
    handleSubmit,
    history,
    location,
    pristine,
    submitting
  } = props;

  const date = {
    start: location.state.start,
    end: location.state.end,
  }

  return (
    <form
      className="pure-form pure-form-stacked"
      onSubmit={handleSubmit(values => {
        scheduleSubmit(Object.assign(values, { date }), history)
      })}
    >
      <h2>Class:</h2>
      <Field
        name="class"
        component={ClassesSelector}
        selected={location.state.class}
        history={history}
        location={location}
        classes={classes}
        defaultValue={12345} />

      <h2>Starts at:</h2>
      <h4>{moment(date.start).format(format)}</h4>

      <h2>Ends at:</h2>
      <h4>{moment(date.end).format(format)}</h4>

      <h2>Instructor Name</h2>
      <Field
        name="instructor"
        component="input"
        type="text"
      />

      <h2>Number of spots (total)</h2>
      <Field
        component={props => {
          const {
            input
          } = props;
          return <NumericInput
            min={0}
            max={20}
            value={input.value}
            onChange={value => {
              input.onChange(value)
            }} />
        }}
        name="spots.total"
      />

      <h2>Number of spots (reseller)</h2>
      <Field
        component={props => {
          const {
            input
          } = props;
          return <NumericInput
            min={0}
            max={20}
            value={input.value}
            onChange={value => {
              input.onChange(value)
            }} />
        }}
        name="spots.reseller"
      />

      <h2>Price (individual)</h2>
      <Field
        component={props => {
          const {
            input
          } = props;
          return <NumericInput
            min={0}
            max={20}
            precision={2}
            step={0.01}
            value={input.value}
            onChange={value => {
              input.onChange(value)
            }} />
        }}
        name="price.individual"
      />

      <h2>Price (reseller)</h2>
      <Field
        component={props => {
          const {
            input
          } = props;
          return <NumericInput
            min={0}
            max={20}
            precision={2}
            step={0.01}
            value={input.value}
            onChange={value => {
              input.onChange(value)
            }} />
        }}
        name="price.reseller"
      />

      <hr />
      <button
          disabled={pristine || submitting}
          type="submit"
          className="pure-button pure-button-primary">Create Schedule</button>
    </form>
  )
}

export default reduxForm({
  // a unique name for the form
  form: 'schedule'
})(ScheduleForm)