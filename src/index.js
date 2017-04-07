import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './util/wrappers.js'
import { userLoggedIn } from './user/ui/loginbutton/LoginButtonActions.js'
import Web3 from 'web3'
const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)
import AuthenticationContract from '../build/contracts/Authentication.json'
const contract = require('truffle-contract')

// Layouts
import App from './App';
import Home from './layouts/home/Home';
import Dashboard from './layouts/dashboard/Dashboard';
import SignUp from './user/layouts/signup/SignUp';
import Profile from './user/layouts/profile/Profile';

// Redux Store
import store from './store';

const history = syncHistoryWithStore(browserHistory, store)
let isAnonymous = false
let hasAccount = false


function HomeWrapper() {
  return <Home isAuthenticated={!isAnonymous} hasAccount={hasAccount} />
}

function render() {
  ReactDOM.render((
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={UserIsNotAuthenticated(HomeWrapper)} />
            <Route path="dashboard" component={UserIsAuthenticated(Dashboard)} />
            <Route path="signup" component={UserIsNotAuthenticated(SignUp)} />
            <Route path="profile" component={UserIsAuthenticated(Profile)} />
          </Route>
        </Router>
      </Provider>
    ),
    document.getElementById('root')
  );
}

web3.eth.getCoinbase((error, coinbase) => {
  if (error) {
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
    render()
  })
})


