import React from 'react'
import eth from 'util/eth'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'
import { Link } from 'react-router-dom'

const OnlyAuthLinks = VisibleOnlyAuth((props) => {
  const balance = parseFloat(eth.web3().fromWei(props.user.data.balance), 10).toFixed(2)

  return (<span>
    <li>
      <Link to="/profile">
        <div style={{ marginRight: 10, float: 'left' }}>
          {balance} ETH
        </div>
        <div style={{ float: 'left', marginTop: 6 }}>
          <svg
            style={{ width: 25, height: 25, fill: 'black' }}
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 1000 1000"
            enableBackground="new 0 0 1000 1000"
          >
            <g><path d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10z M789.6,848.7c-46.5-1.7-144.9-17.2-187.9-113.6c-11.4-25.6-12.6-46.8,0-61c15-17,33.8-62.7,40.7-101.7c2.8-15.5,40.2-20.8,40.7-61c18.4-20.1-0.1-56.3,0-81.4c0.2-62.3,6.9-121.8-20.4-162.8c-80.7-121.3-242.1-120.2-325.5,0c-25.6,36.8-20.5,100.2-20.4,162.8c0,25.7-21.7,60.1,0,81.4c0,40.4,35.6,39,40.7,61c9.1,39.6,20.3,81.5,40.7,101.7c19.9,19.9,9,34.6,0,61c-29.3,86.1-132.5,112-180.3,119.5c-104.2-83-171.1-211-171.1-354.6c0-250.3,203-453.3,453.3-453.3c250.3,0,453.2,202.9,453.2,453.3C953.3,640.2,889.6,765.6,789.6,848.7z" /></g>
          </svg>
        </div>
      </Link>
    </li>
  </span>)
})

const OnlyGuestLinks = HiddenOnlyAuth(() =>
  (<span>
    <li className="pure-menu-item">
      <Link to="/signup">Sign Up</Link>
    </li>]
   </span>))

const Navigation = (props) => {
  const {
    user,
  } = props

  const name = user.data ? user.data.name : 'JUMBO'
  return (
    <nav className="navbar pure-menu-horizontal white darken-2">
      <Link to="/dashboard" style={{ fontSize: 30, marginLeft: 10, textTransform: 'uppercase' }}>{name}</Link>
      <ul className="pure-menu-list navbar-right">
        <OnlyGuestLinks />
        <OnlyAuthLinks user={user} />
      </ul>
    </nav>
  )
}

export default Navigation
