import { put, call, takeEvery, apply } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { stopSubmit, startSubmit } from 'redux-form'
import { eth } from 'util/eth'
import { CLASS_CREATE, classCreated } from './CreateClassActions'
import { formName } from './CreateClassForm'

const value = obj => parseInt(obj.valueOf(10), 10)

export function* doCreateClass(action) {
  const Studio = eth.Studio()

  startSubmit(formName)

  try {
    const studio = yield Studio.deployed()
    const count = yield studio.classesCount.call(eth.defaultAccount)
    const classCountBefore = value(count)

    yield apply(studio, studio.classCreate, [action.name, action.description, eth.from()])

    // todo: something more elegant
    let classCount = classCountBefore
    while (classCount === classCountBefore) {
      const countOnContract = yield studio.classesCount.call(eth.defaultAccount)
      classCount = value(countOnContract)
      if (classCount !== classCountBefore + 1) {
        yield delay(200)
      }
    }
    const address = yield studio.classAtIndex.call(`${eth.defaultAccount}`, classCountBefore)
    yield put(classCreated({
      address,
      name: action.name,
      description: action.description,
    }))
    yield put(stopSubmit(formName))
    yield call(
      action.history.push,
      '/schedule/new',
      Object.assign({}, action.location.state, { class: address }),
    )
  } catch (error) {
    /* eslint-disable no-console */
    console.log(error)
    yield put(stopSubmit(formName))
  }
}

export function* watchCreateClass() {
  yield takeEvery(CLASS_CREATE, doCreateClass)
}
