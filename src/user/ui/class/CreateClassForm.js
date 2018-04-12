import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

export const formName = 'createClassForm'

const CreateClassForm = props => {
  const style = {
    field: {
      marginBottom: 20,
    },
    loadingIcon: {
      position: 'relative',
      top: 3,
      left: 3,
    },
  }

  const {
    classCreate,
    handleSubmit,
    history,
    location,
    pristine,
    submitting,
  } = props

  return (
    <form
      className="pure-form pure-form-stacked"
      onSubmit={handleSubmit(values => new Promise(() => {
          classCreate(values.name, values.description, history, location)
        }))}
    >
      <fieldset>
        <div style={style.field}>
          <label htmlFor="name">Name</label>
          <Field name="name" component="input" type="text" placeholder="Name" />
        </div>
        <div style={style.field}>
          <label htmlFor="description">About this class</label>
          <Field name="description" component="textarea" type="text" rows="7" style={{ height: 'inherit' }} placeholder="Description" />
        </div>
        <button
          disabled={submitting || pristine}
          type="submit"
          className="cta"
        >
          <span>Create Class</span>
          {submitting && <span style={style.loadingIcon}>{<img alt="loader" src="/ajax-loader.gif" />}</span>}
        </button>
      </fieldset>
    </form>
  )
}

CreateClassForm.propTypes = {
  classCreate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

export default reduxForm({
  // a unique name for the form
  form: formName,
})(CreateClassForm)
