import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routerActions } from 'react-router-redux'

export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/signup',
  wrapperDisplayName: 'UserIsAuthenticated',
  predicate: user => user.data !== null,
})

export const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: state => state.user,
  redirectAction: routerActions.replace,
  failureRedirectPath: (state, ownProps) => {
    return '/dashboard'
  },
  wrapperDisplayName: 'UserIsNotAuthenticated',
  predicate: user => user.data === null,
  allowRedirectBack: false
})

// UI Component Wrappers
export const VisibleOnlyAuth = UserAuthWrapper({
  authSelector: state => state.user,
  wrapperDisplayName: 'VisibleOnlyAuth',
  predicate: user => user.data,
  FailureComponent: null
})

export const HiddenOnlyAuth = UserAuthWrapper({
  authSelector: state => state.user,
  wrapperDisplayName: 'HiddenOnlyAuth',
  predicate: user => user.data === null,
  FailureComponent: null
})
