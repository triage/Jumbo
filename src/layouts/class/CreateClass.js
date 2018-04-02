import React from 'react'
import CreateClassContainer from '../../user/ui/class/CreateClassContainer'

const CreateClass = props => (
  <main className="container">
    <div className="half">  
      <h1>Create a new Class</h1>
      <div className="pure-u-1-1 section">
        <CreateClassContainer {...props} /> 
      </div>
    </div>
  </main>
)

export default CreateClass
