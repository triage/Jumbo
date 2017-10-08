import React, { Component } from 'react'

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.user.name
    }
  }

  onInputChange(event) {
    this.setState({ name: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.name.length < 2)
    {
      return alert('Please fill in your name.')
    }

    this.props.onProfileFormSubmit(this.state.name)
  }

  render() {
    return(
      <div>
        <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" value={this.state.name} onChange={this.onInputChange.bind(this)} placeholder="Name" />
            <span className="pure-form-message">This is a required field.</span>
            <br />
            <button type="submit" className="pure-button pure-button-primary">Update</button>
          </fieldset>
        </form>
      </div>
    )
  }
}

export default Profile
