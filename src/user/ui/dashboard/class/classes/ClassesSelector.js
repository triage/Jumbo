import React from 'react'

const ClassesSelector = ({classes, onClassTap, onClassNew}) => {
  if(!classes) {
    return <div />
  }
  if(!classes.length > 0) {
    return <div />
  }
  const options = classes.map((classObject) => {
    return (
      <option key={`studio_${classObject.address}`}>{classObject.name}</option>
    )
  })

  return (
    <select onChange={(value) => {
      alert("hi")
      debugger
    }}>
      {options}
      <option value="new">Create new ...</option>
    </select>
  )  
}

export default ClassesSelector
