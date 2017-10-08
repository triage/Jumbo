import React from 'react'
import { Field, reduxForm } from 'redux-form'

const Resellers = props => {

    const {
      resellers,
      handleSubmit,
      resellerAdd,
      resellerRemove,
      pristine,
      submitting
    } = props

    return (
        <div style={{ float: 'left' }}>
            <form
                className="pure-form pure-form-stacked"
                onSubmit={handleSubmit(values => {
                    resellerAdd(values.address)
                })}
                >
                <fieldset>
                    <label htmlFor="name">New reseller address:</label>
                    <Field name="address" component="input" type="text" placeholder="Name" />
                    <button
                    disabled={pristine || submitting}
                    type="submit"
                    className="pure-button pure-button-primary">Add Reseller</button>
                </fieldset>
            </form>
            <div>
                <ul>
                    {resellers.map(reseller => (
                        <li>{reseller} - <a href="#" onClick={() => {
                            resellerRemove(reseller)
                        }}>x</a></li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default reduxForm({
    // a unique name for the form
    form: 'resellers'
  })(Resellers)