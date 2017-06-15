import { browserHistory } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, autoRehydrate } from 'redux-persist'
import reducer from './reducer'
import { rootSaga } from './sagas'

const routingMiddleware = routerMiddleware(browserHistory)
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  undefined,
  compose(
    applyMiddleware(
      thunkMiddleware,
      routingMiddleware,
      sagaMiddleware
    ),
    autoRehydrate()
  )
)

sagaMiddleware.run(rootSaga)

export default store
