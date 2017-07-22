import { SCHEDULE_LOADED, SCHEDULES_LOADED } from './ScheduleActions'
import { SPOT_PURCHASED, SPOT_CANCELLED } from 'user/ui/schedule/ScheduleDetailActions'

const initialState = []

const studioReducer = (state = initialState, action) => {
  if (action.type === 'persist/REHYDRATE') {
    return action.payload.schedules || initialState
  } else if (action.type === SCHEDULE_LOADED) {
    
    const schedules = Array.from(state)
    const existing = schedules.findIndex(found => {
      return found.address === action.schedule.address
    })
    if (existing >=0 ) {
      schedules[existing] = action.schedule
    } else {
      schedules.push(action.schedule)
    }

    return schedules
  } else if (action.type === SCHEDULES_LOADED) {
    return action.schedules
  } else if (action.type === SPOT_PURCHASED) {

  } else if (action.type === SPOT_CANCELLED) {

  }
  return state
}

export default studioReducer
