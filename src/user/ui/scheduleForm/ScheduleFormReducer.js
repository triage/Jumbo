import {
  SCHEDULE_DATES_CHANGED,
  SCHEDULE_DATE_START_CHANGED,
  SCHEDULE_DATE_END_CHANGED,
  SCHEDULE_CLASS_CHANGED,
  SCHEDULE_INSTRUCTOR_CHANGED,
  SCHEDULE_NUMBER_SPOTS_CHANGED,
  SCHEDULE_NUMBER_RESELLER_SPOTS_CHANGED,
  SCHEDULE_PRICE_INDIVIDUAL_CHANGED,
  SCHEDULE_PRICE_RESELLER_CHANGED
} from './ScheduleFormActions'
import moment from 'moment'

const initialState = {
  class: null,
  date: {
    start: moment(),
    end: moment()
  },
  instructor: null,
  spots: {
    total: 20,
    reseller: 0
  },
  price: {
    individual: 0,
    reseller: 0
  }
}

const ScheduleFormReducer = (state = initialState, action) => {
  if (action.type === SCHEDULE_DATES_CHANGED) {
    return Object.assign({}, state, {
      date: Object.assign({}, state.date, {
        start: action.start,
        end: action.end
      })
    })
  } else if (action.type === SCHEDULE_DATE_START_CHANGED) {
    return Object.assign({}, state, {
      date: Object.assign({}, state.date, {
        start: action.date
      })
    })
  } else if (action.type === SCHEDULE_DATE_END_CHANGED) {
    return Object.assign({}, state, {
      date: Object.assign({}, state.date, {
        end: action.date
      })
    })
  } else if (action.type === SCHEDULE_INSTRUCTOR_CHANGED) {
    return Object.assign({}, state, {
      instructor: action.instructor
    })
  } else if (action.type === SCHEDULE_CLASS_CHANGED) {
    return Object.assign({}, state, {
      class: action.class
    })
  } else if (action.type === SCHEDULE_NUMBER_SPOTS_CHANGED) {
    return Object.assign({}, state, {
      spots: Object.assign({}, state.spots, {
        total: action.numberOfSpots
      })
    })
  } else if (action.type === SCHEDULE_NUMBER_RESELLER_SPOTS_CHANGED) {
    return Object.assign({}, state, {
      spots: Object.assign({}, state.spots, {
        reseller: action.numberOfSpots
      })
    })
  } else if (action.type === SCHEDULE_NUMBER_RESELLER_SPOTS_CHANGED) {
    return Object.assign({}, state, {
      spots: Object.assign({}, state.spots, {
        reseller: action.numberOfSpots
      })
    })
  } else if (action.type === SCHEDULE_NUMBER_RESELLER_SPOTS_CHANGED) {
    return Object.assign({}, state, {
      spots: Object.assign({}, state.spots, {
        reseller: action.numberOfSpots
      })
    })
  } else if (action.type === SCHEDULE_PRICE_INDIVIDUAL_CHANGED) {
    return Object.assign({}, state, {
      price: Object.assign({}, state.price, {
        individual: action.price
      })
    })
  } else if (action.type === SCHEDULE_PRICE_RESELLER_CHANGED) {
    return Object.assign({}, state, {
      price: Object.assign({}, state.price, {
        reseller: action.price
      })
    })
  }
  return state
}

export default ScheduleFormReducer
