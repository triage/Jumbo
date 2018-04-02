//Individual schedule state
import { SCHEDULE_LOADED } from './ScheduleActions'
import { INDIVIDUAL_LOADED } from '../../user/model/IndividualActions'
import { SPOT_PURCHASED, SPOT_CANCELLED } from 'user/ui/schedule/ScheduleDetailActions'

const initialState = []

const schedulesReducer = (state = initialState, action) => {
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
  } else if (action.type === INDIVIDUAL_LOADED) {
    return Array.from(action.schedules)
  } else if (action.type === SPOT_PURCHASED) {
    const schedules = Array.from(state).map(schedule => {
      if (schedule.address === action.schedule.address) {
        return Object.assign({}, schedule, {
          reserved: true
        })
      }
      return schedule
    })
    return schedules
  } else if (action.type === SPOT_CANCELLED) {
    const schedules = Array.from(state).map(schedule => {
      if (schedule.address === action.schedule.address) {
        return Object.assign({}, schedule, {
          reserved: false
        })
      }
      return schedule
    })
    return schedules
  }
  return state
}

export default schedulesReducer
