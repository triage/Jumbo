import React from 'react'

const ClassesSelector = (props) => {
  const {
    classes,
    location,
    history,
    input,
  } = props

  const options = classes.map(classObject => (
    <option
      value={classObject.address}
      data-address={classObject.address}
      key={`studio_${classObject.address}`}
    >
      {classObject.name}
    </option>
  ))

  return (
    <select
      value={location.state.class}
      onChange={(event) => {
        if (event.target.selectedOptions[0].dataset.action === 'new') {
          history.push('/class/new', location.state)
          return
        }
        const address = event.target.selectedOptions[0].dataset.address
        input.onChange({ address })
}
      }
    >
      <option value="" />
      {options}
      <option value="new" data-action="new" data-class={null}>Create new ...</option>
    </select>
  )
}

export default ClassesSelector
