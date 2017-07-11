import React from 'react'
import { Field, reduxForm } from 'redux-form'

const CreateClassForm = props => {

  const {
    classCreate,
    handleSubmit,
    history,
    location,
    pristine,
    submitting
  } = props;

  return (
    <form
      className="pure-form pure-form-stacked"
      onSubmit={handleSubmit(values => {
        classCreate(values.name, values.description, history, location)
      })}
    >
      <fieldset>
        <label htmlFor="name">Name</label>
        <Field name="name" component="input" type="text" placeholder="Name" />
        <label htmlFor="description">Description</label>
        <Field name="description" component="textarea" placeholder="Description" />
        <button
          disabled={pristine || submitting}
          type="submit"
          className="pure-button pure-button-primary">Create Class</button>
      </fieldset>
    </form>
  )
}

export default reduxForm({
  // a unique name for the form
  form: 'classCreate'
})(CreateClassForm)