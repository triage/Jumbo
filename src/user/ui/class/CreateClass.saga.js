import { put, call, takeEvery, apply } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { CLASS_CREATE, classCreated } from './CreateClassActions'
import eth from 'src/util/eth'

export function* doCreateClass(action) {

  const Studio = eth.Studio()

  try {
    //create the class
    const studio = yield Studio.deployed()
    //this is weird, yes. I get the count first, and then get the class at that index after the successful tx.
    //if I got the count after the tx, the count was always -1 from where it was supposed to be.
    const count = yield studio.classesCount.call(eth.defaultAccount)

    const classCountBefore = parseInt(count.valueOf(10), 10)
    yield apply(studio, studio.classCreate, [action.name, action.description, eth.from()])
    let classCount = classCountBefore
    while (classCount === classCountBefore) {
      const count = yield studio.classesCount.call(eth.defaultAccount)
      classCount = parseInt(count.valueOf(10), 10)
      if (classCount !== classCountBefore + 1) {
        yield delay(200)
      }
    }
    const address = yield studio.classAtIndex.call(`${eth.defaultAccount}`, classCountBefore)
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
