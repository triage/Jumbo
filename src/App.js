import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './util/wrappers.js'
import { Link, withRouter } from 'react-router-dom'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

// Layouts
import Dashboard from './layouts/dashboard/Dashboard'
import SignUp from './user/layouts/signup/SignUp'
import Profile from './user/layouts/profile/Profile'
import ScheduleForm from './layouts/schedule/ScheduleForm'
import ScheduleDetail from './layouts/schedule/ScheduleDetail'
import CreateClass from './layouts/class/CreateClass'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

const App = () => {
  const OnlyAuthLinks = VisibleOnlyAuth(() =>
    <span>
      <li className="pure-menu-item">
        <Link to="/dashboard" className="pure-menu-link">Dashboard</Link>
      </li>
      <li className="pure-menu-item">
        <Link to="/profile" className="pure-menu-link">Profile</Link>
      </li>
    </span>
  )

  const OnlyGuestLinks = HiddenOnlyAuth(() =>
    <span>
      <li className="pure-menu-item">
        <Link to="/signup" className="pure-menu-link">Sign Up</Link>
      </li>]
      </span>
  )

  return (
    <div className="App">
      <nav className="navbar pure-menu pure-menu-horizontal">

        <ul className="pure-menu-list navbar-right">
          <OnlyGuestLinks />
          <OnlyAuthLinks />
        </ul>
      </nav>
      <Switch>
        <Route path="/schedule/new" component={UserIsAuthenticated(ScheduleForm)} />
        <Route path="/schedule/:address" component={ScheduleDetail} />
        <Route path="/class/new" component={UserIsAuthenticated(CreateClass)} />
        <Route path="/signup" component={UserIsNotAuthenticated(SignUp)} />
        <Route path="/profile" component={UserIsAuthenticated(Profile)} />
        <Route path="/" component={UserIsAuthenticated(Dashboard)} />
      </Switch>
    </div>
  );
}

export default withRouter(App)

//<Link to="/dashboard" className="pure-menu-heading pure-menu-link">JUMBO</Link>
