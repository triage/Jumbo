import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
// Redux Store
import store from './store'
import { userLoggedIn } from './user/ui/signupform/SignUpFormActions'
import { start, SigninError } from './util/eth'
import App from './App'
import { userPurge } from './user/model/UserActions'
import { studioLoad } from './user/model/StudioActions'
import { resellerLoad } from './user/model/ResellerActions'
import { individualLoad } from './user/model/IndividualActions'
import UserType from './user/model/UserType'

function render() {
  ReactDOM.render(
    (
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    ),
    document.getElementById('root'),
  );
}

start().then(user => {
  store.dispatch(userLoggedIn(user))
  if (user.type === UserType.studio) {
    store.dispatch(studioLoad(user.address))
  } else if (user.type === UserType.individual) {
    store.dispatch(individualLoad(user.address))
  } else if (user.type === UserType.reseller) {
    store.dispatch(resellerLoad(user.address))
  }
  render()
}).catch(error => {
  switch (error) {
    case SigninError.unauthorized:
      /* eslint-disable no-console */
      break
    case SigninError.anonymous:
      /* eslint-disable no-console */
      break
    case SigninError.unsupported:
      /* eslint-disable no-console */
      break
    default:

      break
  }

  store.dispatch(userPurge())
  /* eslint-disable no-console */
  render()
})
