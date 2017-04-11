import React from 'react'

const ClassesSelector = ({classes, onClassTap}) => {
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
    <select>
      {options}
    </select>
  )  
}

export default ClassesSelector
