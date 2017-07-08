import React from 'react'
import CreateClassContainer from 'user/ui/class/CreateClassContainer'

const CreateClass = props => (
  <main className="container">
    <div className="pure-g">
      <div className="pure-u-1-1">
        <CreateClassContainer {...props} /> 
      </div>
    </div>
  </main>
)

export default CreateClass
