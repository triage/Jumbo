import { apply, put, call, takeEvery } from 'redux-saga/effects'
import eth from 'src/util/eth'
import { USER_SIGNUP, userLoggedIn } from './SignUpFormActions'
import UserType from 'src/user/model/UserType'

export function* doUserSignup(action) {
  const {
    data,
    history
  } = action

  const entity = data.type === UserType.studio ? eth.Studio() : eth.Individual()

  try {
    const deployed = yield entity.deployed()
    const user = yield apply(entity, entity.signup, [data.name, eth.from()])
    const authentication = yield eth.Authentication().deployed()
    const userData = yield apply(authentication, authentication.login, [eth.defaultAccount, eth.from()])
    yield put(userLoggedIn(
      Object.assign({}, data, {
        address: user.address
      })
    ))
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
