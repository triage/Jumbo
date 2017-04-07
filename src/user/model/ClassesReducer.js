import { CLASSES_LOADED, CLASS_NAME_LOADED, CLASS_DESCRIPTION_LOADED } from './ClassesActions'

const initialState = {
  classes: null,
  schedules: null
}

const classesReducer = (state = initialState, action) => {
  if (action.type === CLASSES_LOADED)
  {
    const newState = Object.assign({}, state, {
      classes: action.classes.map((classAddress) => {
        return { address: classAddress }
      })
    })
    return newState
  }

  if (action.type === CLASS_NAME_LOADED)
  {
    let classes = action.classes.map((classObject) => {
      if(classObject.address === classObject.address) {
        return Object.assign({}, classObject, {
          name: action.name
        })
      }
      return classObject
    })

    let newState = Object.assign({}, state, {
      classes: classes
    })
    debugger
    return newState
  }

  if (action.type === CLASS_DESCRIPTION_LOADED)
  {
    let classes = action.classes.map((classObject) => {
      if(classObject.address === classObject.address) {
        return Object.assign({}, classObject, {
          description: classObject.description
        })
      }
      return classObject
    })

    let newState = Object.assign({}, state, {
      classes: classes
    })
    debugger
    return newState
  }
  return state
}

export default classesReducer
