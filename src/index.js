import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './util/wrappers.js'
import { userLoggedIn } from './user/ui/signupform/SignUpFormActions.js'
import { web3, Authentication } from './util/eth'

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import Dashboard from './layouts/dashboard/Dashboard'
import SignUp from './user/layouts/signup/SignUp'
import Profile from './user/layouts/profile/Profile'
import ScheduleForm from './layouts/schedule/ScheduleForm'
import ScheduleDetail from './layouts/schedule/ScheduleDetail'
import CreateClass from './layouts/class/CreateClass'

// Redux Store
import store from './store'

let isAnonymous = false

// function HomeWrapper() {
//   return <Home isAuthenticated={!isAnonymous} hasAccount={hasAccount} />
// }

function render() {
  ReactDOM.render((
    <Provider store={store}>
      <BrowserRouter>
        <App>
          <Switch>
            <Route path="/schedule/new" component={UserIsAuthenticated(ScheduleForm)} />
            <Route path="/schedule/:address" component={ScheduleDetail} />
            <Route path="/class/new" component={UserIsAuthenticated(CreateClass)} />
            <Route path="/signup" component={UserIsNotAuthenticated(SignUp)} />
            <Route path="/profile" component={UserIsAuthenticated(Profile)} />
            <Route path="/" component={UserIsAuthenticated(Dashboard)} />
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

  Authentication.deployed().then((instance) => {
    return instance.login()
  }).then((user) => {
    if (user) {
      store.dispatch(userLoggedIn(user))
    }
    render()
  }).catch((error) => {
    console.log(`error:${error}`)
    render()
  })
})


