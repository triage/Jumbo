import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Profile extends PureComponent {
  static propTypes = {
    contactDetails: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    userUpdate: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      contactDetails: this.props.user.contactDetails,
      name: this.props.user.name,
    }
  }

  onInputChange(event) {
    this.setState({ name: event.target.value })
  }

  onContactDetailsChanged(event) {
    this.setState({ contactDetails: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.name.length < 2) {
      /* eslint-disable no-alert */
      return alert('Please fill in your name.')
    }

    this.props.userUpdate(this.state.name, this.state.contactDetails)
  }

  render() {
    return (
      <div>
        <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={this.state.name}
              onChange={this.onInputChange.bind(this)}
              placeholder="Name"
            />
            <textarea
              name="contactDetails"
              placeholder="Contact Details"
              onChange={this.onContactDetailsChanged.bind(this)}
              defaultValue={this.props.user.contactDetails}
              style={{ height: 160 }}
            />
            <br />
            <button
              type="submit"
              className="pure-button pure-button-primary"
            >
              Update
            </button>
          </fieldset>
        </form>
      </div>
    )
  }
}

export default Profile