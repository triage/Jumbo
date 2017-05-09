import React from 'react'
import ScheduleForm from 'user/ui/scheduleForm/ScheduleForm'

const ScheduleNew = function() {
  return (
  <main className="container">
    <div className="pure-g">
      <div className="pure-u-1-1">
        <h1>Create a new schedule</h1>

        <ScheduleForm />

      </div>
    </div>
  </main>
  )
}

export default ScheduleNew
