import React from 'react'
import UserType from 'src/user/model/UserType'

const styles = {
  container: {
    float: 'left',
    width: 200,
    marginRight: 20
  }
}

const studioOnly = (userType, component) => {
  if (userType == UserType.studio) {
    return component
  }
  return null
}

const SideNavigation = props => {

    const {
        user,
        router
    } = props

    return (
        <div class="" style={styles.container}>
            <ul>
                <li><a href="#">Profile</a></li>
                <li><a href="#">Resellers</a></li>
            </ul>
        </div>
    )
}

export default SideNavigation
