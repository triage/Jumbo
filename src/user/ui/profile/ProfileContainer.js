import { connect } from 'react-redux'
import Profile from './Profile'
import { updateUser } from './ProfileActions'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.data,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onProfileFormSubmit: (name) => {
      event.preventDefault();
      dispatch(updateUser(name))
    }
  }
}

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

export default ProfileContainer
