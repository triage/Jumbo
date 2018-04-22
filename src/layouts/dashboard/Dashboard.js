import React from 'react'
import DashboardContainer from 'ui/dashboard/DashboardContainer'

const Dashboard = props => (
  <main className="container">
    <div className="pure-g">
      <div className="pure-u-1-1">
        <DashboardContainer {...props} />
      </div>
    </div>
  </main>
)

export default Dashboard
