import React from 'react'
import ScheduleContainer from 'user/ui/schedule/Schedule'

const Schedule = props => {
  return (
  <main className="container">
    <div className="pure-g">
      <div className="pure-u-1-1">
        <ScheduleContainer {...props} />
      </div>
    </div>
  </main>
  )
}

export default Schedule
