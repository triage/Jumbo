import React from 'react'
import UserType from 'src/user/model/UserType'

const styles = {
  container: {
    float: 'left',
    width: 200,
    marginRight: 20
  },
}

const studioOnly = (userType, component) => {
  if (userType === UserType.studio) {
    return component
  }
  return null
}

const SideNavigation = props => {

    const {
      user,
    } = props

    if (!user || user.type !== UserType.studio) {
      console.log('render nothing')
      return null
    }

    return (
        <div style={styles.container}>
            <ul>
                {studioOnly(UserType.studio, <li><a href="/profile">Profile</a></li>)}
                {studioOnly(UserType.studio, <li><a href="/profile/resellers">Resellers</a></li>)}
            </ul>
        </div>
    )
}

export default SideNavigation
