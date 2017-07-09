import React from 'react'

const CreateClassForm = props => {

  const {
    studio,
    onCreateClass,
    onNameChanged,
    onDescriptionChanged,
    history,
  } = props;

  return (
    <form
      className="pure-form pure-form-stacked"
      onSubmit={event => {
        onCreateClass(event, studio, history)
      }}
    >
      <fieldset>
        <label htmlFor="name">Class Name</label>
        <input id="name" type="text" onChange={(event) => {
          onNameChanged(event)}
        } placeholder="Name" />
        <p>Description:</p>
        <textarea id="description" onChange={(event) => {
          onDescriptionChanged(event)}
        } />
        <span className="pure-form-message">This is a required field.</span>
        <br />
        <button type="submit" className="pure-button pure-button-primary">Sign Up</button>
      </fieldset>
    </form>
  )
}

export default CreateClassForm
