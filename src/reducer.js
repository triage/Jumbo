import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
import classesReducer from './user/model/ClassesReducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  classes: classesReducer,
})

export default reducer
