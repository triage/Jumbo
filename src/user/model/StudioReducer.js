import { CLASS_LOADED } from './ClassesActions'

const initialState = {
  classes: [],
  schedules: [],
  name: "loading..."
}

const classesReducer = (state = initialState, action) => {
  if (action.type === CLASS_LOADED) {
    let classes = state.classes
    let found = classes.find((element) => {
      return element.address === action.address
    })
    if(!found) {
      classes.push(action.classObject)
    }
    return Object.assign({}, state, {
      classes: classes
    })
  }
  return state
}

export default classesReducer
