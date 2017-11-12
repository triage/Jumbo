import React from 'react'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'
import { Link } from 'react-router-dom'

const OnlyAuthLinks = VisibleOnlyAuth(() =>
  <span>
    <li>
      <Link to="/dashboard">Dashboard</Link>
    </li>
    <li>
      <Link to="/profile">Profile</Link>
    </li>
  </span>
)

const OnlyGuestLinks = HiddenOnlyAuth(() =>
  <span>
    <li className="pure-menu-item">
      <Link to="/signup">Sign Up</Link>
    </li>]
  </span>
)

const Navigation = props => {

  const {
    user
  } = props

  const name = user ? user.data.name : ''
  return (
    <nav className="navbar pure-menu-horizontal pink darken-2">
        <span style={{ fontSize: 30, marginLeft: 10, textTransform: 'uppercase' }}>{name}</span>
        <ul className="pure-menu-list navbar-right">
        <OnlyGuestLinks />
        <OnlyAuthLinks />
      </ul>
    </nav>
  )
}

export default Navigation


// {user}
// <ul className="pure-menu-list navbar-right">
//   <OnlyGuestLinks />
//   <OnlyAuthLinks />
// </ul>