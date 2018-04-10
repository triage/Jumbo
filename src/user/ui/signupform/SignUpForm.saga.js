import { apply, put, call, takeEvery } from 'redux-saga/effects'
import { SubmissionError, stopSubmit, startSubmit } from 'redux-form';
import { delay } from 'redux-saga'
import eth from 'util/eth'
import UserType from 'user/model/UserType'
import { formName } from './SignUpForm'
import { USER_SIGNUP, userLoggedIn } from './SignUpFormActions'

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

  startSubmit(formName)

  try {
    const deployed = yield entity.deployed()
    yield apply(deployed, deployed.signup, [data.name, eth.from()])
    const authentication = yield eth.Authentication().deployed()
    let loggedIn = false
    // todo: come up with something more elegant
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
    yield put(stopSubmit(formName));
  } catch (error) {
    const message = error.message ? error.message.split("\n")[0] : null
    yield put(stopSubmit(formName));
  }
}

export function* watchUserSignup() {
  yield takeEvery(USER_SIGNUP, doUserSignup)
}
