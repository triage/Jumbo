import { browserHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import reducer from './reducer'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './sagas'

const routingMiddleware = routerMiddleware(browserHistory)
const sagaMiddleware = createSagaMiddleware()
sagaMiddleware.run(rootSaga)

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    routingMiddleware,
    sagaMiddleware
  )
)



export default store
