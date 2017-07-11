import React from 'react'
import { Field, reduxForm } from 'redux-form'

const SignUpForm = props => {

  const {
    userSignup,
    handleSubmit,
    history,
    pristine,
    submitting
  } = props

  return (
    <form
      className="pure-form pure-form-stacked"
      onSubmit={handleSubmit(values => {
        userSignup(values.name, history)
      })}
    >
      <fieldset>
        <label htmlFor="name">Studio Name</label>
        <Field name="name" component="input" type="text" placeholder="Name" />
        <button
          disabled={pristine || submitting}
          type="submit"
          className="pure-button pure-button-primary">Sign Up</button>
      </fieldset>
    </form>
  )
}

export default reduxForm({
  // a unique name for the form
  form: 'signup'
})(SignUpForm)
