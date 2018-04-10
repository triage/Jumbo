import { CLASSES_LOADED } from './ClassesActions'
import { CLASS_CREATED } from 'user/ui/class/CreateClassActions'
import { SCHEDULES_LOADED } from './ScheduleActions'
import { USER_PURGE } from 'user/model/UserActions'
import { STUDIO_LOAD, STUDIO_INFO_LOADED } from './StudioActions'
import { USER_UPDATED } from '../ui/profile/ProfileActions'

const initialStateStudio = address => {
  const studio = {}
  studio[address] = {
    loading: true,
    loaded: false,
    classes: null,
    name: null,
    contactDetails: null,
  }
  return studio
}

const initialState = {}

const studioReducer = (state = initialState, action) => {
  const { address } = action

  if (action.type === USER_PURGE) {
    return initialState
  } else if (action.type === STUDIO_INFO_LOADED) {
    return Object.assign({}, state, {
      name: action.name,
      contactDetails: action.contactDetails,
    })
  } else if (action.type === STUDIO_LOAD) {
    return Object.assign({}, state, initialStateStudio(address))
  } else if (action.type === 'persist/REHYDRATE') {
    return action.payload.studios | initialState
  } else if (action.type === CLASS_CREATED) {
    const classes = state.classes ? Array.from(state.classes) : []
    classes.push(action.class)
    return Object.assign({}, state, {
      classes,
    })
  } else if (action.type === CLASSES_LOADED) {
    return Object.assign({}, state, {
      classes: action.classes,
    })
  } else if (action.type === SCHEDULES_LOADED) {
    return Object.assign({}, state, {
      loaded: true,
      loading: false,
      schedules: action.schedules,
    })
  }
  return state
}

export default studioReducer
