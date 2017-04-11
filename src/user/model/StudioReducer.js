import { CLASS_LOADED, CLASS_CREATED } from './ClassesActions'
import { STUDIO_INFO_LOADED } from './StudioActions'

const initialState = {
  classes: [],
  schedules: [],
  name: null,
  contactDetails: null
}

const studioReducer = (state = initialState, action) => {
  if (action.type === CLASS_CREATED) {
    let classes = state.classes
    classes.push(action.class)
    return Object.assign({}, state, {
      classes: classes
    })
  }
  else if (action.type === CLASS_LOADED) {
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
  } else if (action.type === STUDIO_INFO_LOADED) {
    return Object.assign({}, state, {
      name: action.name,
      contactDetails: action.contactDetails
    })
  }
  return state
}

export default studioReducer
