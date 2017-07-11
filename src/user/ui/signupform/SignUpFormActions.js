export const USER_SIGNUP = 'USER_SIGNUP'
export const userSignup = (name, history) => ({
  type: USER_SIGNUP,
  name,
  history,
})

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
export function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}
