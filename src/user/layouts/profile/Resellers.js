import React, { Component } from 'react'
import ResellersContainer from '../../ui/profile/ResellersContainer'
import SideNavigationContainer from '../../ui/profile/SideNavigationContainer'

class Resellers extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Resellers</h1>
            <SideNavigationContainer />
            <ResellersContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default Resellers
