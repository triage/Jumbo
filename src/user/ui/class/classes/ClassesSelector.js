import React from 'react'

const ClassesSelector = props => {

  const {
    classes,
    input,
  } = props;

  const options = classes.map((classObject) => {
    return (
      <option data-address={classObject.address} key={`studio_${classObject.address}`}>{classObject.name}</option>
    )
  })

  return (
    <select onChange={event => {
        const address = event.target.selectedOptions[0].dataset.address
        props.input.onChange({ address })}
      }>
      <option value=""></option>
      {options}
      <option value="new" data-action="new" data-class={null}>Create new ...</option>
    </select>
  )  
}

export default ClassesSelector
