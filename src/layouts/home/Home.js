import React, { Component } from 'react'
import { browserHistory } from 'react-router'

const Home = ((isAuthenticated) => {
  debugger
  console.log(`isAuthenticated:${isAuthenticated}`)
  if(isAuthenticated.isAuthenticated) {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>JUMBO</h1>
            <p>Please sign up!</p>
          </div>
        </div>
      </main>
    )
  }

  debugger

  return(
    <main className="container">
      <div className="pure-g">
        <div className="pure-u-1-1">
          <h1>JUMBO</h1>
          <p>Please unlock an account to proceed</p>
        </div>
      </div>
    </main>
  )
})

export default Home
