import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Web3 from 'web3'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './util/wrappers.js'
import { userLoggedIn } from './user/ui/loginbutton/LoginButtonActions.js'
import AuthenticationContract from '../build/contracts/Authentication.json'
const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)
const contract = require('truffle-contract')

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import Dashboard from './layouts/dashboard/Dashboard'
import SignUp from './user/layouts/signup/SignUp'
import Profile from './user/layouts/profile/Profile'
import ScheduleNew from './layouts/schedule/ScheduleNew'
import ScheduleDetail from './layouts/schedule/ScheduleDetail'
import CreateClass from './layouts/class/CreateClass'

// Redux Store
import store from './store'

let isAnonymous = false
let hasAccount = false

// function HomeWrapper() {
//   return <Home isAuthenticated={!isAnonymous} hasAccount={hasAccount} />
// }

function render() {
  ReactDOM.render((
    <Provider store={store}>
      <BrowserRouter>
        <App>
          <Switch>
            <Route path="/dashboard" component={UserIsAuthenticated(Dashboard)} />
            <Route path="/schedule/new" component={UserIsAuthenticated(ScheduleNew)} />
            <Route path="/schedule/:address" component={ScheduleDetail} />
            <Route path="/class/new" component={UserIsAuthenticated(CreateClass)} />
            <Route path="/signup" component={UserIsNotAuthenticated(SignUp)} />
            <Route path="/profile" component={UserIsAuthenticated(Profile)} />
          </Switch>
          </App>
        </BrowserRouter>
    </Provider>
    ),
    document.getElementById('root')
  );
}

web3.eth.getCoinbase((error, coinbase) => {
  if (error) {
    console.log(`error:${error}`)
    return
  }
  isAnonymous = coinbase === null
  if (isAnonymous) {
    render()
    return
  }

  const authentication = contract(AuthenticationContract)
  authentication.setProvider(provider)
  authentication.deployed().then((instance) => {
    return instance.login()
  }).then((user) => {
    if (user) {
      hasAccount = true
      store.dispatch(userLoggedIn(user))
    }
    render()
  }).catch((error) => {
    console.log(`error:${error}`)
    render()
  })
})


