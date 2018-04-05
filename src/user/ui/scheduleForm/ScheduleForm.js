import React from 'react'
import { Field, reduxForm } from 'redux-form'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import NumericInput from 'react-numeric-input';
import ClassesSelector from 'user/ui/class/classes/ClassesSelector'

import 'react-date-picker/index.css'

const format = {
  long: 'ddd, MMM D, H:mm a',
  short: 'H:mm a'
}

const ScheduleForm = props => {

  const {
    user,
    classes,
    scheduleSubmit,
    handleSubmit,
    history,
    location,
    pristine,
    submitting
  } = props;

  document.title = `${user.data.name} - Create a Schedule`

  const date = {
    start: location.state.start,
    end: location.state.end,
  }

  const priceProps = {
    min: 0.0,
    max: 0.3,
    step: 0.3 / 20,
    precision: 2,
  }

  return (
    <form
      className="pure-form pure-form-stacked"
      onSubmit={handleSubmit(values => {
        if (!values.class && location.state.class) {
          values.class = { address: location.state.class }
        }
        scheduleSubmit(Object.assign({}, values, { date }), history)
      })}
    >
      <div className="section z-depth-2">
        <h5>{moment(date.start).format(format.long)} - {moment(date.end).format(format.short)}</h5>

        <h5>Class:</h5>
        <Field
          name="class"
          component={ClassesSelector}
          selected={location.state.class}
          history={history}
          location={location}
          classes={classes}
          defaultValue={location.state.class}
          value={location.state.class}
        />

        <h5>Instructor Name</h5>
        <Field
          name="instructor"
          component="input"
          type="text"
        />

      </div>

      <div className="section z-depth-2" style={{ overflow: 'hidden' }}>
        <h5>Number of spots</h5>
        <div className="left">  
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
        </div>
        <div className="left">
          <Field
            component={props => {
              const {
                input
              } = props;
              return <NumericInput
                {...priceProps}
                placeholder="$"
                value={input.value}
                onChange={value => {
                  input.onChange(value)
                }} />
            }}
            name="price.individual"
          />
        </div>
      </div>

      <div className="section z-depth-2" style={{ overflow: 'hidden' }}>
        <h5># of Reseller Spots</h5>
        <div className="left">
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
        </div>
        <div className="left">
          <Field
            component={props => {
              const {
              input
            } = props;
              return <NumericInput
                {...priceProps}
                placeholder="$"
                value={input.value}
                onChange={value => {
                  input.onChange(value)
                }} />
            }}
            name="price.reseller"
          />
        </div>
      </div>
      <button
        disabled={pristine || submitting}
        type="submit"
        className="pure-button pure-button-primary cta">Create Schedule</button>
    </form>
  )
}

export default reduxForm({
  // a unique name for the form
  form: 'schedule'
})(ScheduleForm)