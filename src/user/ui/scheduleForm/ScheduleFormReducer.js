import { SCHEDULE_DATE_CHANGED, SCHEDULE_INSTRUCTOR_CHANGED } from './ScheduleFormActions'
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
      date: action.instructor
    })
  }
  return state
}

export default ScheduleFormReducer
