import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import userReducer from './user/userReducer'
import studioReducer from './user/model/StudioReducer'
import ScheduleFormReducer from './user/ui/scheduleForm/ScheduleFormReducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  studio: studioReducer,
  schedule: ScheduleFormReducer,
  form: formReducer
})

export default reducer
