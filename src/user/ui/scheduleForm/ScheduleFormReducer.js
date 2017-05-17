import { SCHEDULE_DATE_CHANGED, SCHEDULE_CLASS_CHANGED, SCHEDULE_INSTRUCTOR_CHANGED } from './ScheduleFormActions'
import moment from 'moment'

const initialState = {
  class: null,
  date: moment(),
  instructor: null
}

const ScheduleFormReducer = (state = initialState, action) => {
  if (action.type === SCHEDULE_DATE_CHANGED) {
    return Object.assign({}, state, {
      date: action.date
    })
  }
  else if (action.type === SCHEDULE_INSTRUCTOR_CHANGED) {
    return Object.assign({}, state, {
      instructor: action.instructor
    })
  }
  else if (action.type === SCHEDULE_CLASS_CHANGED) {
    debugger
    return Object.assign({}, state, {
      class: action.class
    })
  }
  return state
}

export default ScheduleFormReducer
