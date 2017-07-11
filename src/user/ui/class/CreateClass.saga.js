import { put, call, select, takeEvery, apply } from 'redux-saga/effects'
import { CLASS_CREATE, classCreated } from './CreateClassActions'
import { from, Class, Studio } from 'src/util/eth'

export function* doCreateClass(action) {

  try {
    //create the class
    const studioAddress = yield select(state => state.user.data)
    const classInstance = yield apply(Class, Class.new, [studioAddress, action.name, action.description, from])
    const studioInstance = Studio.at(studioAddress)

    //add the class to the studio
    yield apply(studioInstance, studioInstance.classAdded, [classInstance.address, from])
    yield put(classCreated({
      address: classInstance.address,
      name: action.name,
      description: action.description }
    ))
    yield call(
      action.history.push,
      '/schedule/new',
      Object.assign(action.location.state,{ class: classInstance.address })
    )

  } catch (error) {
    console.log(error)
    yield put({ type: "CLASS_CREATE_FAILED", error })
  }
}

export function* watchCreateClass() {
  yield takeEvery(CLASS_CREATE, doCreateClass)
}
