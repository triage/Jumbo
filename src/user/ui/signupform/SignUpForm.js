import React from 'react'
import { Field, reduxForm } from 'redux-form'
import UserType from 'user/model/UserType'

const SignUpForm = props => {

  const style = {
    radio: {
      float: 'left',
      marginRight: 15,
    },
    userTypeInput: {
      marginTop: 10,
      marginBottom: 10,
      clear: 'both',
      height: 30
    },
    radioField: {
      marginLeft: 5,
    }
  }

  const {
    userSignup,
    handleSubmit,
    history,
    pristine,
    submitting
  } = props

  document.title = 'Sign up!'

  return (
    <div className="section">
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
          <label htmlFor="name">Name</label>
          <Field name="name" component="input" type="text" placeholder="Name" />
          <div style={style.userTypeInput}>
            <div style={style.radio}>
              Studio
              <Field style={style.radioField} name="type" component="input" type="radio" value={UserType.studio} selected />
            </div>
            <div style={style.radio}>
              Individual
              <Field style={style.radioField} name="type" component="input" type="radio" value={UserType.individual} />
            </div>
            <div style={style.radio}>
              Reseller
              <Field style={style.radioField} name="type" component="input" type="radio" value={UserType.reseller} />
            </div>
          </div>
          <button
            disabled={pristine || submitting}
            type="submit"
            className="cta">Sign Up</button>
        </fieldset>
      </form>
    </div>
  )
}

export default reduxForm({
  // a unique name for the form
  form: 'signup'
})(SignUpForm)
