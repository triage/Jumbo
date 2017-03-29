import React from 'react'
import CreateClassContainer from './class/CreateClassContainer'

const Dashboard = ((user, classes) => {
  return(
    <div>
      <p>Create a class</p>
      <CreateClassContainer /> 
      <br />
      classes: 
    </div>
  )
})

export default Dashboard
