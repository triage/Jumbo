import { apply, put, call, takeEvery } from 'redux-saga/effects'
import eth from 'src/util/eth'
import { USER_SIGNUP, userLoggedIn } from './SignUpFormActions'
import UserType from 'src/user/model/UserType'

export function* doUserSignup(action) {
  const {
    data,
    history
  } = action

  const Studio = eth.Studio()
  const Individual = eth.Individual()

  if (data.type === UserType.studio) {
    try {
      const studio = yield apply(Studio, Studio.new, [data.name, eth.from()])
      const authentication = yield call(eth.Authentication().deployed)
      yield apply(authentication, authentication.signup, [studio.address, data.type, eth.from()])
      yield apply(authentication, authentication.login, [eth.defaultAccount(), eth.from()])
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
    try {
      const individual = yield apply(Individual, Individual.new, [data.name, eth.from()])
      const authentication = yield call(eth.Authentication().deployed)
      yield apply(authentication, authentication.signup, [individual.address, data.type, eth.from()])
      yield apply(authentication, authentication.login, [eth.defaultAccount(), eth.from()])
      yield put(userLoggedIn(
        Object.assign({}, data, {
          address: individual.address
        })
      ))
      yield call(history.push, '/dashboard')
    } catch (error) {
      console.log(error)
      debugger
      history.push('/signup')
    }
  }
}

export function* watchUserSignup() {
  yield takeEvery(USER_SIGNUP, doUserSignup)
}