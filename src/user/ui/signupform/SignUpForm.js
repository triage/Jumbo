import React from 'react'
import { Field, reduxForm } from 'redux-form'
import UserType from 'src/user/model/UserType'

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
        userSignup({
            name: values.name,
            type: values.type
          },
          history
        )
      })}
    >
      <fieldset>
        <label htmlFor="name">Studio Name</label>
        <Field name="name" component="input" type="text" placeholder="Name" />
        <div style={{ margin: 10 }}>
        Studio
        <Field name="type" component="input" type="radio" value={UserType.studio} selected />
        Individual
        <Field name="type" component="input" type="radio" value={UserType.individual} />
        </div>
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
