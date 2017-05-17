import React from 'react'

const ClassesSelector = ({classes, onClassSelect}) => {
  const options = classes.map((classObject) => {
    return (
      <option data-class={classObject} key={`studio_${classObject.address}`}>{classObject.name}</option>
    )
  })

  return (
    <select onChange={(event) => {
      onClassSelect(event)
    }}>
      <option value=""></option>
      {options}
      <option value="new" data-action="new" data-class={null}>Create new ...</option>
    </select>
  )  
}

export default ClassesSelector
