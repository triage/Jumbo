import React from 'react'
import UserType from 'src/user/model/UserType'

const ClassInfo = props => {
  const {
    user,
    schedule
  } = props
  if (user.type === UserType.studio) {
    return null
  }
  return <p>{schedule.class.description}</p>
}

export default ClassInfo
