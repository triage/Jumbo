export const USER_SIGNUP = 'USER_SIGNUP'
export const userSignup = (data, history) => ({
  type: USER_SIGNUP,
  data,
  history,
})

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
export function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    data: user
  }
}
