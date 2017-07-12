import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
// Redux Store
import store from './store'
import { userLoggedIn } from './user/ui/signupform/SignUpFormActions.js'
import { start } from './util/eth'
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
  isLoggedIn = true
  render()
}).catch(error => {
  console.log(`error:${error}`)
  isLoggedIn = false
  render()
})
