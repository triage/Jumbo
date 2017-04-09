import Class from './ClassContainer'
import React from 'react'

const Classes = ((classes) => {
  debugger
  const options = classes.map((address) => {
    return (
      <Class class={address} />
      )
  })

  return (
    <select>
      {options}
    </select>
  )  
})

export default Classes
