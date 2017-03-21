import React from 'react'
import DashboardContainer from '../../user/ui/dashboard/DashboardContainer'

const Dashboard = function() {
  return (
  <main className="container">
    <div className="pure-g">
      <div className="pure-u-1-1">
        <h1>Dashboard</h1>
        <DashboardContainer />
      </div>
    </div>
  </main>
  )
}

export default Dashboard
