import { connect } from 'react-redux'
import Profile from './Profile'
import { userUpdate } from './ProfileActions'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.data,
    contactDetails: state.studio.contactDetails
  }
}

const mapDispatchToProps = {
  userUpdate
}

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

export default ProfileContainer
