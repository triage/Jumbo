import React from 'react'
import { Schedule } from 'data/schedule/Schedule';

const ClassInfo: React.SFC<{schedule?: Schedule}> = props => (
  <div className="section z-depth-2">
    <h5>About this class:</h5>
    {/* <p style={{ whiteSpace: 'pre-line' }}>{schedule!.class.description}</p> */}
  </div>
)

export { ClassInfo }
