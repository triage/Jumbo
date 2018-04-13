import { USER_PURGE } from 'user/data/user/UserActions'
import { RESELLER_LOADED } from './ResellerActions'

const initialState = {
  studios: [],
}

const resellerReducer = (state = initialState, action) => {
  if (action.type === USER_PURGE) {
    return initialState
  } else if (action.type === RESELLER_LOADED) {
    return Object.assign({}, state, {
      studios: action.studios,
    })
  }
  return state
}

export default resellerReducer
