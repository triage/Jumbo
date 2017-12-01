import { apply, put, call, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import eth from 'src/util/eth'
import { USER_SIGNUP, userLoggedIn } from './SignUpFormActions'
import UserType from 'src/user/model/UserType'

export function* doUserSignup(action) {
  const {
    data,
    history
  } = action

  let entity
  switch(data.type) {
    case UserType.studio:
      entity = eth.Studio()
      break
    case UserType.individual:
      entity = eth.Individual()
      break
    case UserType.reseller:
      entity = eth.Reseller()
      break
    default:
      entity = null
      break
  }

  try {
    const deployed = yield entity.deployed()
    yield apply(deployed, deployed.signup, [data.name, eth.from()])
    const authentication = yield eth.Authentication().deployed()
    let loggedIn = false
    while (!loggedIn) {
      loggedIn = yield authentication.login.call(eth.from())
      if (!loggedIn) {
        yield delay(200)
      }
    }
    
    if (loggedIn) {
      yield put(userLoggedIn({
        ...data,
        address: eth.defaultAccount,
      }))
      yield call(history.push, '/dashboard')
    } else {
      debugger
    }
  } catch (error) {
    console.log(error)
    debugger
    history.push('/signup')
  }
}

export function* watchUserSignup() {
  yield takeEvery(USER_SIGNUP, doUserSignup)
}
