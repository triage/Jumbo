import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './util/wrappers.js'
import NavigationContainer from './NavigationContainer'

// Layouts
import Dashboard from './layouts/dashboard/Dashboard'
import SignUp from './user/layouts/signup/SignUp'
import Profile from './user/layouts/profile/Profile'
import Resellers from './user/layouts/profile/Resellers'
import ScheduleForm from './layouts/schedule/ScheduleForm'
import ScheduleDetail from './layouts/schedule/ScheduleDetail'
import CreateClass from './layouts/class/CreateClass'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

const App = () => {

  return (
    <div className="App">
      <NavigationContainer />
      <Switch>
        <Route path="/schedule/new" component={UserIsAuthenticated(ScheduleForm)} />
        <Route path="/schedule/:address" component={ScheduleDetail} />
        <Route path="/class/new" component={UserIsAuthenticated(CreateClass)} />
        <Route path="/signup" component={UserIsNotAuthenticated(SignUp)} />
        <Route path="/profile/resellers" component={UserIsAuthenticated(Resellers)} />
        <Route path="/profile" component={UserIsAuthenticated(Profile)} />
        <Route path="/" component={UserIsAuthenticated(Dashboard)} />
      </Switch>
    </div>
  );
}

export default withRouter(App)
