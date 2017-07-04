import { browserHistory } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, autoRehydrate } from 'redux-persist'
import reducer from './reducer'
import { rootSaga } from './sagas'

const routingMiddleware = routerMiddleware(browserHistory)
const sagaMiddleware = createSagaMiddleware()

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  autoRehydrate(),
  applyMiddleware(
    thunkMiddleware,
    routingMiddleware,
    sagaMiddleware
  )
);
const store = createStore(reducer, undefined, enhancer);
sagaMiddleware.run(rootSaga)
persistStore(store)

export default store
