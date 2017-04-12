import React from 'react'
import ClassesContainer from 'src/user/ui/dashboard/class/classes/ClassesContainer'

const ScheduleNew = function() {
  return (
  <main className="container">
    <div className="pure-g">
      <div className="pure-u-1-1">
        <div>Create a new schedule</div>
        <ClassesContainer />
      </div>
    </div>
  </main>
  )
}

export default ScheduleNew
