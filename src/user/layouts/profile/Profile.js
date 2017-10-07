import React, { Component } from 'react'
import ProfileFormContainer from '../../ui/profileform/ProfileFormContainer'
import SideNavigation from '../../ui/profileform/SideNavigation'

class Profile extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Profile</h1>
            <SideNavigation />
            <ProfileFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default Profile
