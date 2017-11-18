import React from 'react'
import ScheduleFormContainer from 'user/ui/scheduleForm/ScheduleFormContainer'

const ScheduleNew = props => {
  return (
  <main className="container">
    <div className="pure-g">
      <div className="pure-u-1-1">
        <h1>Create a new schedule</h1>
        <ScheduleFormContainer {...props} />
      </div>
    </div>
  </main>
  )
}

export default ScheduleNew
