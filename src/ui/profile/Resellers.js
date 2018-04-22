import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { eth } from 'util/eth'

export const formName = 'resellers'
const style = {
  addButton: {
    marginTop: '3pt',
    height: '34pt',
    marginLeft: '10pt',
  },
}

class Resellers extends PureComponent {
  constructor() {
    super()
    this.state = {
      inputValid: true,
      name: null,
      timer: null,
      buttonTitle: 'Add Reseller',
    }
  }

  onAddressChanged(event) {
    clearTimeout(this.state.timer)
    this.setState({
      inputValid: false,
      name: null,
      timer: setTimeout(() => {
        eth.Reseller().deployed().then(reseller => reseller.getName.call(event.target.value)).then(name => {
          this.setState({
            inputValid: name.length > 0,
            buttonTitle: name.length > 0 ? `Add Reseller (${name})` : 'Add Reseller',
            name,
          })
        })
      }, 1000),
    })
  }

  render() {
    const {
      resellers,
      handleSubmit,
      resellerAdd,
      resellerRemove,
      pristine,
      submitting,
    } = this.props

    return (
      <div>
        <form
          className="pure-form pure-form-stacked"
          onSubmit={handleSubmit(values => {
            resellerAdd(values.address, this.state.name)
            this.setState({
              name: null,
            })
          })}
        >
          <fieldset>
            <div>
              <label htmlFor="name">New reseller address:</label>
              <Field
                style={{ float: 'left', width: '50%' }}
                name="address"
                component="input"
                type="text"
                placeholder="Name"
                onChange={event => this.onAddressChanged(event)}
              />
              <button
                disabled={pristine || submitting || !this.state.inputValid}
                type="submit"
                style={style.addButton}
                className="cta"
              >
                {this.state.buttonTitle}
              </button>
            </div>
            <div style={{ marginTop: 32 }}>
              <hr />
              <ul>
                {resellers.map(reseller => (
                  <li key={reseller.address}>{reseller.name} ({reseller.address}) -
                    <button
                      onClick={() => {
                        resellerRemove(reseller.address)
                      }}
                    >
                      x
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </fieldset>
        </form>
      </div>
    )
  }
}

Resellers.propTypes = {
  resellers: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resellerAdd: PropTypes.func.isRequired,
  resellerRemove: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

export default reduxForm({
  // a unique name for the form
  form: formName,
})(Resellers)