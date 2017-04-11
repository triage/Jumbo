import React from 'react'
import CreateClassContainer from './class/CreateClassContainer'
import ClassesContainer from './class/classes/ClassesContainer'

const Dashboard = ((user) => {
  return(
    <div>
      <p>Create a class</p>
      <CreateClassContainer /> 
      <br />
      classes: 
      <ClassesContainer />
    </div>
  )
})

export default Dashboard
