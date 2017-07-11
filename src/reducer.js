import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import userReducer from './user/userReducer'
import studioReducer from './user/model/StudioReducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  studio: studioReducer,
  form: formReducer
})

export default reducer
