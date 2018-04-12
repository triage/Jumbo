import React from 'react'
import ResellersContainer from '../../ui/profile/ResellersContainer'
import SideNavigationContainer from '../../ui/profile/SideNavigationContainer'

export default () => (
  <main className="container">
    <div className="pure-g">
      <div className="pure-u-1-1">
        <h1>Resellers</h1>
        <div className="section">
          <SideNavigationContainer />
          <ResellersContainer />
        </div>
      </div>
    </div>
  </main>
)
