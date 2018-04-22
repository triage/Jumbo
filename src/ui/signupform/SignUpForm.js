import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import UserType from 'data/user/UserType'

export const formName = 'SignupForm'

const SignUpForm = props => {
  const style = {
    loadingIcon: {
      position: 'relative',
      top: 3,
      left: 3,
    },
    radio: {
      float: 'left',
      marginRight: 15,
    },
    userTypeInput: {
      marginTop: 10,
      marginBottom: 10,
      clear: 'both',
      height: 30,
    },
    radioField: {
      marginLeft: 5,
    },
  }

  const {
    userSignup,
    handleSubmit,
    history,
    pristine,
    submitting,
  } = props

  document.title = 'Sign up!'

  return (
    <div className="section">
      <form
        className="pure-form pure-form-stacked"
        onSubmit={
          handleSubmit(values => new Promise(() => {
              userSignup(
                {
                  name: values.name,
                  type: values.type,
                },
                history,
              )
            }))
        }
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
            disabled={submitting || pristine}
            type="submit"
            className="cta"
          >
            <span>Sign Up</span>
            {submitting && <span style={style.loadingIcon}>{<img alt="loader" src="/ajax-loader.gif" />}</span>}
          </button>

        </fieldset>
      </form>
    </div>
  )
}

SignUpForm.propTypes = {
  userSignup: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

export default reduxForm({
  // a unique name for the form
  form: formName,
})(SignUpForm)
