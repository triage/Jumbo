import { put, call, takeEvery, apply } from 'redux-saga/effects'
import { CLASS_CREATE, classCreated } from './CreateClassActions'
import eth from 'src/util/eth'

export function* doCreateClass(action) {

  const Studio = eth.Studio()

  try {
    //create the class
    const studio = yield Studio.deployed()
    yield apply(studio, studio.classCreate, [action.name, action.description, eth.from()])
    const count = yield studio.classesCount.call(eth.from())
    const address = yield studio.classAtIndex.call(count - 1)
    yield put(classCreated({
      address,
      name: action.name,
      description: action.description
    }))
    yield call(
      action.history.push,
      '/schedule/new',
      Object.assign({}, action.location.state, { class: address })
    )

  } catch (error) {
    console.log(error)
    yield put({ type: "CLASS_CREATE_FAILED", error })
  }
}

export function* watchCreateClass() {
  yield takeEvery(CLASS_CREATE, doCreateClass)
}
