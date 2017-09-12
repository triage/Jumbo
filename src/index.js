import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
// Redux Store
import store from './store'
import { userLoggedIn } from './user/ui/signupform/SignUpFormActions.js'
import { start, SigninError } from './util/eth'
import App from './App'
import { userPurge } from 'src/user/model/UserActions'
import { studioLoad } from './user/model/StudioActions'
import { individualLoad } from './user/model/IndividualActions'
import UserType from './user/model/UserType'

let isAnonymous = false
let isLoggedIn = false

function render() {
  ReactDOM.render((
    <Provider store={store}>
      <BrowserRouter>
        <App isLoggedIn={isLoggedIn} isAnonymous={isAnonymous} />
      </BrowserRouter>
    </Provider>
  ),
    document.getElementById('root')
  );
}

start().then(user => {
  isLoggedIn = true
  console.log(user)
  store.dispatch(userLoggedIn(user))
  if (user.type === UserType.studio) {
    store.dispatch(studioLoad(user.address))
  } else if (user.type === UserType.individual) {
    store.dispatch(individualLoad(user.address))
  } else if (user.type === UserType.reseller) {
    debugger
  }
  render()
}).catch(error => {
  switch (error) {
    case SigninError.unauthorized:
      console.log('unauthorized')
    break
    case SigninError.anonymous:
      console.log('anonymous')
    break
    case SigninError.unsupported:
      console.log('unsupported')
    break
    default:
      debugger
    break
  }

  store.dispatch(userPurge())
  console.log(`error:${error}`)
  
  isLoggedIn = false
  render()
})
