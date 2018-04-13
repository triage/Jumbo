import { USER_LOGGED_IN } from 'user/ui/signupform/SignUpFormActions'
import { USER_PURGE, BALANCE_UPDATED } from 'user/data/user/UserActions'
import { SPOT_PURCHASED, SPOT_CANCELLED } from 'user/ui/schedule/ScheduleDetailActions'
import { USER_UPDATED } from 'user/ui/profile/ProfileActions'

const initialState = {
  data: null,
  date: new Date(),
}

const userReducer = (state = initialState, action) => {
  if (action.type === USER_PURGE) {
    return Object.assign({}, state, {
      data: null,
    })
  } else if (action.type === USER_LOGGED_IN) {
    return Object.assign({}, state, {
      data: action.data,
    })
  } else if (action.type === USER_UPDATED) {
    return Object.assign({}, state, {
      data: Object.assign({}, state.data, {
        contactDetails: action.contactDetails,
      }),
    })
  } else if (action.type === SPOT_PURCHASED || action.type === SPOT_CANCELLED) {
    return Object.assign({}, state, {
      date: new Date(),
    })
  } else if (action.type === 'USER_LOGGED_OUT') {
    return Object.assign({}, state, {
      data: null,
    })
  } else if (action.type === BALANCE_UPDATED) {
    const copy = Object.assign({}, state)
    copy.data.balance = action.balance
    return copy
  }
  return state
}

export default userReducer
