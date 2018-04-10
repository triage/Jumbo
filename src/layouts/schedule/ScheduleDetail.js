import React from 'react'
import ScheduleDetailContainer from 'user/ui/schedule/ScheduleDetailContainer'

const ScheduleDetail = props => (
  <main className="container">
    <div className="pure-g">
      <div className="pure-u-1-1">
        <ScheduleDetailContainer {...props} />
      </div>
    </div>
  </main>
)

export default ScheduleDetail
