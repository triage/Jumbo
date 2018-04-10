import React, { Component } from 'react'
import ProfileContainer from '../../ui/profile/ProfileContainer'
import SideNavigationContainer from '../../ui/profile/SideNavigationContainer'

class Profile extends Component {
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Profile</h1>
            <div className="section">
              <SideNavigationContainer />
              <ProfileContainer />
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Profile
