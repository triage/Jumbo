import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import user from './user/userReducer'
import studio from './user/model/StudioReducer'
import schedules from './user/model/SchedulesReducer'
import resellers from './user/model/ResellersReducer'

const reducer = combineReducers({
  routing,
  user,
  studio,
  form,
  resellers,
  schedules
})

export default reducer
