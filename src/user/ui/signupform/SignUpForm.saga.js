import { apply, put, call, takeEvery } from 'redux-saga/effects'
import { from, coinbase, Authentication, Studio } from 'src/util/eth/contracts'
import { USER_SIGNUP, userLoggedIn } from './SignUpFormActions'
import UserType from 'src/user/model/UserType'

export function* doUserSignup(action) {
  const {
    data,
    history
  } = action

  if (data.type === UserType.studio) {
    try {
      const studio = yield apply(Studio, Studio.new, [data.name, from])
      const authentication = yield call(Authentication.deployed)
      yield apply(authentication, authentication.signup, [studio.address, from])
      yield apply(authentication, authentication.login, [coinbase, from])
      yield put(userLoggedIn(
        Object.assign({}, data, {
          address: studio.address
        })
      ))
      yield call(history.push, '/dashboard')
    } catch (error) {
      console.log(error)
      debugger
      history.push('/signup')
    }
  } else {
    debugger
  }
}

export function* watchUserSignup() {
  yield takeEvery(USER_SIGNUP, doUserSignup)
}