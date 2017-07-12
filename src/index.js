import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { userLoggedIn } from './user/ui/signupform/SignUpFormActions.js'
import { start } from './util/eth/start'
import App from './App'



let isAnonymous = false
let isLoggedIn = false

// function HomeWrapper() {
//   return <Home isAuthenticated={!isAnonymous} hasAccount={hasAccount} />
// }

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
  debugger
  isLoggedIn = true
  render()
}).catch(error => {
  debugger
  console.log(`error:{error}`)
  isLoggedIn = false
  render()
})
