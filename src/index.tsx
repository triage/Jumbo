import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
// Redux Store
import store from './app/store'
import { userLoggedIn } from './user/ui/signupform/SignUpFormActions'
import { start, SigninError } from './util/eth'
import App from './App'
import { userPurge } from './user/data/user/UserActions'
import { studioLoad } from './user/data/studio/StudioActions'
import { resellerLoad } from './user/data/reseller/ResellerActions'
import { individualLoad } from './user/data/individual/IndividualActions'
import UserType from './user/data/user/UserType'

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
