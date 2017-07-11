import React from 'react'

const ClassesSelector = props => {

  const {
    classes,
    location,
    selected,
    history,
    input,
  } = props;

  const options = classes.map((classObject) => {
    return (
      <option selected={classObject.address===selected} data-address={classObject.address} key={`studio_${classObject.address}`}>{classObject.name}</option>
    )
  })

  return (
    <select onChange={event => {
        if (event.target.selectedOptions[0].dataset.action === 'new') {
          history.push('/class/new', location.state)
          return
        }
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
