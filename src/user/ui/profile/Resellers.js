import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'
import eth from 'src/util/eth'

export const formName = "resellers"

class Resellers extends PureComponent {

    constructor() {
        super()
        this.state = {
            inputValid: true,
            name: null,
            timer: null,
        }
    }

    onAddressChanged(event) {
        clearTimeout(this.state.timer)
        this.setState({
            inputValid: false,
            name: null,
            timer: setTimeout(() => {
                eth.Reseller().deployed().then(reseller => {
                    return reseller.getName.call(event.target.value)
                }).then(name => {
                    this.setState({
                        inputValid: false,
                        name
                    })
                })
            }, 1000) 
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
            <div style={{ float: 'left' }}>
                <form
                    className="pure-form pure-form-stacked"
                    onSubmit={handleSubmit(values => {
                        resellerAdd(values.address, this.state.name)
                        this.setState({
                            name: null
                        })
                    })}
                >
                    <fieldset>                        
                        <div>
                            <label htmlFor="name">New reseller address:</label>
                            <Field style={{ float: 'left' }} name="address" component="input" type="text" placeholder="Name" onChange={event => this.onAddressChanged(event)} /> {this.state.name}
                        </div>
                        <div>
                            <button
                                disabled={pristine || submitting || this.state.valid}
                                type="submit"
                                className="pure-button pure-button-primary">Add Reseller</button>
                        </div>
                    </fieldset>
                </form>
                <div>
                    <ul>
                        {resellers.map(reseller => (
                            <li key={reseller.address}>{reseller.name} ({ reseller.address }) - <a href="#" onClick={() => {
                                resellerRemove(reseller.address)
                            }}>x</a></li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    // a unique name for the form
    form: formName
})(Resellers)
