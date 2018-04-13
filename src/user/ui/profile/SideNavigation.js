import React from 'react'
import PropTypes from 'prop-types'
import UserType from 'user/data/user/UserType'

const styles = {
  container: {
    float: 'left',
    width: 200,
    marginRight: 20,
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

SideNavigation.propTypes = {
  user: PropTypes.object.isRequired,
}

export default SideNavigation
