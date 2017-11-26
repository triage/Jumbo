import { USER_LOGGED_IN} from 'src/user/ui/signupform/SignUpFormActions'
import { USER_PURGE, BALANCE_UPDATED } from 'src/user/model/UserActions'
import { SPOT_PURCHASED, SPOT_CANCELLED } from 'src/user/ui/schedule/ScheduleDetailActions'

const initialState = {
  data: null,
  date: new Date()
}

const userReducer = (state = initialState, action) => {
  if (action.type === USER_PURGE) {
    return Object.assign({}, state, {
      data: null
    })
  } else if (action.type === USER_LOGGED_IN || action.type === 'USER_UPDATED') {
    return Object.assign({}, state, {
      data: action.data
    })
  } else if (action.type === SPOT_PURCHASED || action.type === SPOT_CANCELLED) {
    return Object.assign({}, state, {
      date: new Date()
    })
  } else if (action.type === 'USER_LOGGED_OUT') {
    return Object.assign({}, state, {
      data: null
    })
  } else if (action.type === BALANCE_UPDATED) {
    let copy = Object.assign({}, state)
    copy.data.balance = action.balance
    return copy
  }
  return state
}

export default userReducer
