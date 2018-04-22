import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import user from 'user/userReducer'
import studio from 'user/data/studio/StudioReducer'
import schedules from 'user/data/schedule/SchedulesReducer'
import resellers from 'user/data/reseller/ResellersReducer'
import reseller from 'user/data/reseller/ResellerReducer'
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
