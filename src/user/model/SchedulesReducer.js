import { SCHEDULE_LOADED, SCHEDULES_LOADED } from './ScheduleActions'
import { SPOT_PURCHASED, SPOT_CANCELLED, SCHEDULE_COMPLETED } from 'user/ui/schedule/ScheduleDetailActions'

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
    const schedules = Array.from(state).map(schedule => {
      if (schedule.address === action.schedule.address) {
        schedule.reserved = true
      }
      return schedule
    })
    return schedules
  } else if (action.type === SPOT_CANCELLED) {
    const schedules = Array.from(state).map(schedule => {
      debugger
      if (schedule.address === action.schedule.address) {
        debugger
        schedule.reserved = false
      }
      return schedule
    })
    return schedules
  } else if (action.type === SCHEDULE_COMPLETED) {
    return Array.from(state).filter(schedule => schedule.address !== action.schedule)
  }
  return state
}

export default studioReducer
