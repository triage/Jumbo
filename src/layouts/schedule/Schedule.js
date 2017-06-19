import React from 'react'
import ScheduleContainer from 'user/ui/schedule/ScheduleContainer'

const Schedule = props => {
  return (
  <main className="container">
    <div className="pure-g">
      <div className="pure-u-1-1">
        <ScheduleContainer {...props.params} />
      </div>
    </div>
  </main>
  )
}

export default Schedule
