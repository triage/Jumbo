import { CLASSES_LOADED } from './ClassesActions'
import { USER_PURGE } from 'src/user/model/UserActions'
import { RESELLER_LOADED } from './ResellerActions'

const initialState = {
  studios: []
}

const resellerReducer = (state = initialState, action) => {
  if (action.type === USER_PURGE) {
    return initialState
  } else if (action.type === RESELLER_LOADED) {
    return Object.assign({}, state, {
      studios: action.studios
    })
  }
  return state
}

export default resellerReducer
