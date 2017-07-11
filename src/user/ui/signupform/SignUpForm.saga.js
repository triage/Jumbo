import { apply, put, call, takeEvery } from 'redux-saga/effects'
import { from, coinbase, Authentication, Studio } from 'src/util/eth'
import { USER_SIGNUP, userLoggedIn } from './SignUpFormActions'

export function* doUserSignup(action) {
  const {
    name,
    history
  } = action

  try {
    const studio = yield apply(Studio, Studio.new, [name, from])
    const authentication = yield call(Authentication.deployed)
    yield apply(authentication, authentication.signup, [studio.address, from])
    yield apply(authentication, authentication.login, [coinbase, from])
    yield put(userLoggedIn(studio.address))
    yield call(history.push, '/dashboard')
  } catch (error) {
    console.log(error)
    debugger
    history.push('/signup')
  }
}

export function* watchUserSignup() {
  yield takeEvery(USER_SIGNUP, doUserSignup)
}