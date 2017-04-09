import { CLASS_LOAD, CLASS_NAME_LOADED, CLASS_DESCRIPTION_LOADED } from './ClassesActions'

const initialState = {
  classes: [],
  schedules: [],
  name: "loading..."
}

const classesReducer = (state = initialState, action) => {
  if (action.type === CLASS_LOAD) {
    let classes = state.classes
    let found = classes.find((element) => {
      return element.address === action.address
    })
    if(!found) {
      classes.push({
        address: action.address
      })
    }
    const newState = Object.assign({}, state, {
      classes: classes
    })
    return newState
  }

  // if (action.type === CLASS_NAME_LOADED)
  // {
  //   let classes = state.classes.map((classObject) => {
  //     if(classObject.address === action.address) {
  //       return Object.assign({}, classObject, {
  //         name: action.name
  //       })
  //     }
  //     return classObject
  //   })
  //   return Object.assign({}, state, {
  //     classes: classes
  //   })
  // }

  // if (action.type === CLASS_DESCRIPTION_LOADED)
  // {
  //   debugger
  //   let classes = state.classes.map((classObject) => {
  //     if(classObject.address === action.address) {
  //       return Object.assign({}, classObject, {
  //         description: classObject.description
  //       })
  //     }
  //     return classObject
  //   })

  //   return Object.assign({},  state, {
  //     classes: classes
  //   })
  // }
  return state
}

export default classesReducer
