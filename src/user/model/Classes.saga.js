import { put, takeEvery } from 'redux-saga/effects'
import eth from 'util/eth'
import { CLASSES_LOAD, classesLoaded } from './ClassesActions'

export function* doClassesLoad(action) {
  try {
    const studio = yield eth.Studio().deployed()
    const classesCount = yield studio.classesCount(action.address)
    const classes = []
    for (let classIndex = 0; classIndex < classesCount.toNumber(); classIndex += 1) {
      const address = yield studio.classAtIndex.call(action.address, classIndex)
      const instance = eth.Class().at(address)
      const name = yield instance.name.call()
      const description = yield instance.description.call()
      const classObject = {
        address,
        name,
        description,
      }
      classes.push(classObject)
    }
    yield put(classesLoaded(classes))
  } catch (error) {
    /* eslint-disable no-console */
    console.log(`error:${error}`)
  }
}

export function* watchClassesLoad() {
  yield takeEvery(CLASSES_LOAD, doClassesLoad)
}
