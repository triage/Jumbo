import { CLASSES_LOADED } from './ClassesActions'
import { CLASS_CREATED } from 'user/ui/class/CreateClassActions'
import { SCHEDULES_LOADED } from './ScheduleActions'
import { USER_PURGE } from 'user/model/UserActions'
import { STUDIO_LOAD, STUDIO_INFO_LOADED } from './StudioActions'
import { SCHEDULE_COMPLETED, SCHEDULE_CANCELLED } from 'user/ui/schedule/ScheduleDetailActions'
import { USER_UPDATED } from '../ui/profile/ProfileActions'

const initialState = {
  address: null,
  loading: false,
  loaded: false,
  classes: null,
  name: null,
  contactDetails: null,
  schedules: [],
}

const studioReducer = (state = initialState, action) => {
  if (action.type === USER_PURGE) {
    return initialState
  } else if (action.type === STUDIO_INFO_LOADED || action.type === USER_UPDATED) {
    return Object.assign({}, state, {
      name: action.name,
      contactDetails: action.contactDetails
    })
  } else if (action.type === STUDIO_LOAD) {
    return Object.assign({}, state, {
      loading: true,
      address: action.address,
    })
  } else if (action.type === 'persist/REHYDRATE') {
    return action.payload.studio | initialState;
  } else if (action.type === CLASS_CREATED) {
    let classes = state.classes ? Array.from(state.classes) : []
    classes.push(action.class)
    return Object.assign({}, state, {
      classes: classes
    })
  } else if (action.type === CLASSES_LOADED) {
    return Object.assign({}, state, {
      classes: action.classes
    })
  } else if (action.type === SCHEDULES_LOADED) {
    return Object.assign({}, state, {
      loaded: true,
      loading: false,
      schedules: Array.from(action.schedules),
    })
  } else if (action.type === SCHEDULE_COMPLETED || action.type === SCHEDULE_CANCELLED) {
    return Object.assign({}, state, {
      schedules: state.schedules.filter(schedule => schedule.address !== action.schedule)
    })
  }
  return state
}

export default studioReducer
