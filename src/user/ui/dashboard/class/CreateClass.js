import React from 'react'

const CreateClass = ((props) => (
  <form className="pure-form pure-form-stacked" onSubmit={props.onCreateClass(this)}>
    <fieldset>
      <label htmlFor="name">Class Name</label>
      <input id="name" type="text" onChange={(value) => {
        props.onNameChanged(value)}
      } placeholder="Name" />
      <p>Description:</p>
      <textarea id="description" onChange={(value) => {
        props.onDescriptionChanged(value)}
      } />
      <span className="pure-form-message">This is a required field.</span>
      <br />
      <button type="submit" className="pure-button pure-button-primary">Sign Up</button>
    </fieldset>
  </form>
))

export default CreateClass