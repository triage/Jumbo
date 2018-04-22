import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import user from 'data/user/userReducer'
import studio from 'data/studio/StudioReducer'
import schedules from 'data/schedule/SchedulesReducer'
import resellers from 'data/reseller/ResellersReducer'
import reseller from 'data/reseller/ResellerReducer'
import error from 'error/ErrorReducer'

const reducer = combineReducers({
  error,
  routing,
  user,
  studio,
  form,
  resellers,
  reseller,
  schedules,
})

export default reducer
