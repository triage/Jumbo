import React from 'react'
import ScheduleFormContainer from 'ui/scheduleForm/ScheduleFormContainer'

const ScheduleNew = props => (
  <main className="container">
    <div className="pure-g">
      <div className="pure-u-1-1 half">
        <h1>Create a new schedule</h1>
        <ScheduleFormContainer {...props} />
      </div>
    </div>
  </main>
)

export default ScheduleNew
