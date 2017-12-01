import React from 'react'
import StudioContainer from 'src/ui/studio/StudioContainer'

const Dashboard = props => (
  <main className="container">
    <div className="pure-g">
      <div className="pure-u-1-1">
        <StudioContainer {...props} />
      </div>
    </div>
  </main>
)

export default Dashboard
