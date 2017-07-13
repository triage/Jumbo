import { CLASSES_LOADED } from './ClassesActions'
import { CLASS_CREATED } from 'src/user/ui/class/CreateClassActions'
import { SCHEDULES_LOADED } from './ScheduleActions'
import { USER_PURGE } from 'src/user/model/UserActions'

const initialState = {
  loaded: false,
  classes: null,
  schedules: [],
  name: null,
  contactDetails: null
}

const studioReducer = (state = initialState, action) => {
  if (action.type === USER_PURGE) {
    return initialState
  }
  else if (action.type === 'persiste/REHYDRATE') {
    return action.payload;
  } else if (action.type === CLASS_CREATED) {
    let classes = state.classes ? Array.from(state.classes) : []
    classes.push(action.class)
    return Object.assign({}, state, {
      classes: classes
    })
  }
  else if (action.type === CLASSES_LOADED) {
    return Object.assign({}, state, {
      classes: action.classes
    })
  } else if (action.type === SCHEDULES_LOADED) {
    return Object.assign({}, state, {
      schedules: action.schedules,
      loaded: true
    })
  }
  return state
}

export default studioReducer
