// import Class from './ClassContainer'
import React from 'react'

const ClassesSelector = ((studio, onClassTap, foobar) => {
  if(!studio.studio.classes) {
    return <div />
  }
  if(!studio.studio.classes.length > 0) {
    return <div />
  }
  const options = studio.studio.classes.map((classObject) => {
    return (
      <option key={`studio_${classObject.address}`}>{classObject.name}</option>
    )
  })

  return (
    <select>
      {options}
    </select>
  )  
})

export default ClassesSelector
