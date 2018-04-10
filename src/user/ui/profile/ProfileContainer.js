import { connect } from 'react-redux'
import Profile from './Profile'
import { userUpdate } from './ProfileActions'

const mapStateToProps = (state, ownProps) => ({
  user: state.user.data,
})

const mapDispatchToProps = {
  userUpdate,
}

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile)

export default ProfileContainer
